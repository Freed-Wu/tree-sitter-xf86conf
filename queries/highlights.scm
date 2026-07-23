; General
(section_name) @constant

(identifier) @variable

[
  "Section"
  "EndSection"
  "SubSection"
  "EndSubSection"
] @keyword

; Comments
(comment) @comment

(comment
  (body) @spell)

; Literals
(int) @number

(float) @number.float

(string) @string

"-" @punctuation.delimiter
