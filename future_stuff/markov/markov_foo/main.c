#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <time.h>
#include <ctype.h>
#include "markov.h"
#include "state.h"

#define DEFAULT_NODES 256

int build_0gram_graph(char *input_buffer, int input_buffer_size, int *hist)
{
	memset(hist, 0, sizeof(int) * 256);

	for(int i = 0; i < input_buffer_size; i++) {
		hist[(unsigned char) input_buffer[i]]++;
	}

	return 0;
}

int print_0gram_text(int *hist, int characters)
{
	srand(time(NULL));

	int total_entries = 0;

	for(int i = 0; i < 256; i++) {
		total_entries += hist[i];
	}

	printf("Generating text:\n");

	for(int i = 0; i < characters; i++) {
		int random_selection = rand() % total_entries;

		int index_hist = 0;
		for(int j = 0; j < 256; j++) {
			index_hist += hist[j];

			if(index_hist >= random_selection) {
				printf("%c", j);

				break;
			}
		}
	}

	printf("\n");

	return 0;
}

struct markov_node * build_ngram_graph(char *input_buffer, int input_buffer_size, int gram)
{
	struct markov_node *mn_ptr;
	struct markov_node *mn_root_ptr;
	struct markov_node *mn_child_ptr;

	if(!(mn_ptr = malloc(sizeof(struct markov_node)))) {
		perror("malloc");

		return NULL;
	}

	if(!(mn_ptr->string = malloc(gram + 1))) {
		perror("malloc");

		return NULL;
	}

	strncpy(mn_ptr->string, input_buffer, gram);
	mn_ptr->string[gram] = 0;

	mn_ptr->edges = NULL;
	mn_ptr->edges_count = 0;
	mn_ptr->visited = 0;

	mn_root_ptr = mn_ptr;

	char str[gram + 1];

	for(int i = gram; i + gram < input_buffer_size; i += gram) {
		strncpy(str, &input_buffer[i], gram);
		str[gram] = 0;

		for(int i = 0; str[i]; i++)
			str[i] = tolower(str[i]);

		if(!(mn_child_ptr = markov_find_node(mn_root_ptr, str))) {
			if(!(mn_child_ptr = malloc(sizeof(struct markov_node)))) {
				perror("malloc");

				return NULL;
			}

			if(!(mn_child_ptr->string = malloc(gram + 1))) {
				perror("malloc");

				return NULL;
			}

			strcpy(mn_child_ptr->string, str);
			mn_child_ptr->string[gram] = 0;

			mn_child_ptr->edges = NULL;
			mn_child_ptr->edges_count = 0;
			mn_child_ptr->visited = 0;
		}
		markov_clean_visited_flag(mn_root_ptr);

		markov_add_node(mn_ptr, mn_child_ptr);

		mn_ptr = mn_child_ptr;
	}

//	markov_print_nodes(mn_root_ptr);

	return mn_root_ptr;
}

int generate_random_words(struct markov_node *entry_node, int nodes)
{
	srand(time(NULL));

	if(markov_generate_words(entry_node, nodes) < 0)
		return -1;

	printf(".\n");

	return markov_free(entry_node);
}

int print_help(char *program_name)
{
	printf("usage: %s [-h help] [-w words (nodes) to generate] [-g gram] [input filename]\n", program_name);

	return 0;
}

int main(int argc, char **argv)
{
	int opt;
	int gram = 1;
	int nodes = DEFAULT_NODES;
	char *input_filename;

	while((opt = getopt(argc, argv, "hg:w:")) != -1) {
		switch(opt) {
			case 'h':
				print_help(argv[0]);

				return 1;

			case 'g':
				gram = atoi(optarg);

				break;

			case 'w':
				nodes = atoi(optarg);		

				break;
		}
	}

	if(optind >= argc) {
		print_help(argv[0]);

		return 1;
	}

	if(!nodes && gram)
		nodes = DEFAULT_NODES / gram;
	else if(gram)
		nodes /= gram;

	if(gram < 0) {
		printf("Error: Gram must be >= 0!\n");

		return 1;
	}

	input_filename = argv[optind];

	int fd;
	if((fd = open(input_filename, O_RDONLY)) < 0) {
		perror("open");

		return 1;
	}

	struct stat buf;

	if(stat(input_filename, &buf) < 0) {
		perror("stat");

		return 1;
	}

	char *file_buffer;

	if(!(file_buffer = malloc(buf.st_size))) {
		perror("malloc");

		return 1;
	}

	if(read(fd, file_buffer, buf.st_size) < 0) {
		perror("read");

		return 1;
	}

	if(!gram) {
		int hist[256];
		build_0gram_graph(file_buffer, buf.st_size, hist);
			
		print_0gram_text(hist, nodes);
	}
	else {
		struct markov_node *entry_node;
		if(!(entry_node = build_ngram_graph(file_buffer, buf.st_size, gram))) {
			printf("Error: Unexpected error.\n");

			return 1;
		}

		if(generate_random_words(entry_node, nodes) < 0) {
			printf("Error: Unexpected error.\n");

			return 1;
		}
	}

	return 0;
}
