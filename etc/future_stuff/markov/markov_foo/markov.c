#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "markov.h"

int markov_generate_words(struct markov_node *mn, int limit)
{
	for(int count = 0; count < limit; count++) {
		printf("%s", mn->string);

		float selection = (float) (rand() % 100) / 100.0;

		float p_sum = 0;
		for(int i = 0; i < mn->edges_count; i++) {
			p_sum += mn->edges[i]->p;

			if(p_sum >= selection) {
				mn = mn->edges[i]->ptr;

				break;
			}
		}
	}

	return 0;
}

int markov_print_nodes(struct markov_node *mn)
{
	printf("Node: %s\n", mn->string);
	for(int i = 0; i < mn->edges_count; i++) {
		printf("Edge %d -> %s, p: %f\n", i, mn->edges[i]->ptr->string, mn->edges[i]->p);
	}
	printf("\n");

	mn->visited = 1;

	for(int i = 0; i < mn->edges_count; i++) {
		if(mn == mn->edges[i]->ptr) {
			printf("()() %s -> %s\n", mn->string, mn->edges[i]->ptr->string);
			
			continue;
		}

		if(mn->edges[i]->ptr->visited)
			continue;

		markov_print_nodes(mn->edges[i]->ptr);
	}

	return 0;
}

int markov_free(struct markov_node *mn)
{
	mn->visited = 1;

	for(int i = 0; i < mn->edges_count; i++) {
		if(mn->edges[i]->ptr->visited)
			continue;

		markov_free(mn->edges[i]->ptr);
	}

	for(int i = 0; i < mn->edges_count; i++) {
		free(mn->edges[i]);
	}

	free(mn);

	return 0;
}

int markov_clean_visited_flag(struct markov_node *mn)
{
	mn->visited = 0;

	for(int i = 0; i < mn->edges_count; i++) {
		if(mn == mn->edges[i]->ptr)
			continue;

		if(!(mn->edges[i]->ptr->visited))
			continue;

		markov_clean_visited_flag(mn->edges[i]->ptr);
	}

	return 0;
}

struct markov_node * markov_find_node(struct markov_node *mn, char *search_string)
{
	mn->visited = 1;

	if(!strcmp(search_string, mn->string))
		return mn;

	for(int i = 0; i < mn->edges_count; i++) {
		if(mn == mn->edges[i]->ptr || !strcmp(mn->string, mn->edges[i]->ptr->string) || mn->edges[i]->ptr->visited) // Skip self-referencing edges.
			continue;

		struct markov_node *mn_ptr;
		if((mn_ptr = markov_find_node(mn->edges[i]->ptr, search_string)))
			return mn_ptr;
	}

	return NULL;
}

int markov_node_update_p(struct markov_node *mn)
{
	int total_count = 0;

	for(int i = 0; i < mn->edges_count; i++) {
		total_count += mn->edges[i]->count;
	}

	for(int i = 0; i < mn->edges_count; i++) {
		mn->edges[i]->p = (float) mn->edges[i]->count / (float) total_count;
	}

	return 0;
}

int markov_add_node(struct markov_node *parent, struct markov_node *child)
{
	int child_index = -1;

	for(int i = 0; i < parent->edges_count; i++) {
		if(!strcmp(parent->edges[i]->ptr->string, child->string)) {
			child_index = i;

			break;
		}
	}

	if(child_index < 0) {
		if(!(parent->edges = realloc(parent->edges, sizeof(struct markov_node_ptr *) * (parent->edges_count + 1)))) {
		        perror("malloc");

		        return -1;
		}

		if(!(parent->edges[parent->edges_count] = malloc(sizeof(struct markov_node_ptr)))) {
		        perror("malloc");

		        return -1;
		}

		parent->edges[parent->edges_count]->ptr = child;
		parent->edges[parent->edges_count]->count = 1;

		parent->edges_count ++;

		markov_node_update_p(parent);
	}
	else {
		parent->edges[child_index]->count++;

		markov_node_update_p(parent);
	}
	
	return 0;
}
