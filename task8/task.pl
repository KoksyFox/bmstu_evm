writeFib(A, B, C, D) :-
    (
		(A == B, write("Yes"), nl, true);
		(A == C, write("Yes"), nl, true);
		(A == D, write("Yes"), nl, true);
		(B == C, write("Yes"), nl, true);
		(B == D, write("Yes"), nl, true);
		(C == D, write("Yes"), nl, true);
		write("No"), fail
	).
a :- write("Number A: "), nl,
     read(A), nl, 
     write("Number B: "), nl,
     read(B), nl,
	 write("Number C: "), nl,
     read(C), nl, 
     write("Number D: "), nl,
     read(D), nl,
     writeFib(A, B, C, D).