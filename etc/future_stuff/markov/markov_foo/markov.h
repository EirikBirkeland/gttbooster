#ifndef MARKOV_H
#define MARKOV_H

struct markov_node {
	char *string;

	struct markov_node_ptr **edges;
	int edges_count;
	_Bool visited;
};

struct markov_node_ptr {
	struct markov_node *ptr;
	float p;
	int count;
};

int markov_generate_words(struct markov_node *mn, int limit);
int markov_print_nodes(struct markov_node *mn);
int markov_free(struct markov_node *mn);
int markov_clean_visited_flag(struct markov_node *mn);
struct markov_node * markov_find_node(struct markov_node *mn, char *search_string);
int markov_add_node(struct markov_node *parent, struct markov_node *new);

#endif
