writeFib(A, B, F1, F2) :-
    A =< B,
    F1 =< B,
    (
        (F1 >= A, write(F1), nl, fail);
        (F3 is F1 + F2, writeFib(A, B, F2, F3))
    ).
        
a :- write("Number A: "), nl,
     read(A), nl, 
     write("Number B: "), nl,
     read(B), nl,
     writeFib(A, B, 1, 1).