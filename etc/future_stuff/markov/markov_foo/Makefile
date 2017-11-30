CC = gcc
CFLAGS = --std=gnu99 -Wall -g
SOURCES = $(wildcard *.c)
HEADERS = *.h
OBJECTS = $(SOURCES:.c=.o)
INCLUDES = $(wildcard *.h)

all: random_text_gen

%.o : %.c ${INCLUDES}
	$(CC) $(CFLAGS) -c $<

random_text_gen: $(OBJECTS) $(HEADERS)
	$(CC) $(CFLAGS) $(OBJECTS) -o $@

clean :
	rm -f random_text_gen
	rm -f *.o
