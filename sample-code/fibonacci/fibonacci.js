function fibonacci(position) {
  if(position === 0 || position === 1) {
    return 1;
  } else {
    return fibonacci(position - 1) + fibonacci(position - 2);
  }
}

// Ignoring symbols, we can evaluate the first line:
// function  : keyword
// fibonacci : identifier
// position  : identifier

// Keywords, are by default, unambiguously interpretable
// Isolated identifiers are, by default, always context dependent

// Second pass:
// function : keyword
// fibonacci(position) : function definition or call

// The second analytical pass we see a more fully
// interpretable text definition, but fibonacci(position) is ambiguous

// Third pass:
// function fibonacci(position) : function declaration

// The final analytical pass resolves to a fully unambiguous
// interpretable text definition, without ambiguity.
// This is our source texteme.

// position === 0 is a fully interpretable texteme, as is position === 1
// if is a keyword, so it is fully interpretable.
// The second line is a conditional phrase described in three textemes

//            CP
//     /            \
//   if               LD
//       /                         \
//     || <- (OR)                    LP
//                          /                  \
//                         position === 0  position === 1

// CP : Conditional Phrase
// LD : Logical Disjunction
// LP : Logical Pair

// || <- (OR) : infix binary operator (language dependent definition)
