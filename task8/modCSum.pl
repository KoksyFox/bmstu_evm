modCSumLoop(Ar, Br, Cr, Summ) :-
    Ar =< Br,
    (
        write("> "), write(Ar), nl,
        SummTmp is Summ + Ar,
        ArTmp is Ar + Cr,
        modCSumLoop(ArTmp, Br, Cr, SummTmp); true
    );
    (
        write("Summ: "), write(Summ), nl,
        fail
    ).

modCSum(A, B, C) :-
    A =< B,
    (C =< A; C =< B),
    Br is B - mod(B, C),
    Ar0 is mod(A, C),
    (
        (Ar0 > 0, C < A, Ar is A - Ar0 + C, modCSumLoop(Ar, Br, C, 0));
        (Ar0 =< 0, C < A, Ar is A, modCSumLoop(Ar, Br, C, 0));
        (C >= A, Ar is C, modCSumLoop(Ar, Br, C, 0))
    ).

a :- write("Number A: "), nl,
    read(A), nl, 
    write("Number B: "), nl,
    read(B), nl,
    write("Number C: "), nl,
    read(C), nl,
    modCSum(A, B, C).