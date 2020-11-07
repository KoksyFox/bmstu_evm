cutSqrtIntLoop(Ar, Br) :-
    Ar =< Br,
    TMP is Ar ^ 2,
    write(TMP), nl,
    ArTmp is Ar + 1,
    cutSqrtIntLoop(ArTmp, Br).

cutSqrtInt(A, B) :-
    A =< B,
    Ar is ceil(sqrt(abs(A))),
    Br is floor(sqrt(abs(B))),
    (
        (A >= 0, B >= 0, cutSqrtIntLoop(Ar, Br));
        (A < 0, B >= 0, cutSqrtIntLoop(0, Br));
        (A >= 0, B < 0, cutSqrtIntLoop(Ar, 0));
        (A < 0, B < 0, fail)
    ).
        
a :- write("Number A: "), nl,
    read(A), nl, 
    write("Number B: "), nl,
    read(B), nl,
    cutSqrtInt(A, B).