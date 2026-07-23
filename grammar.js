/// <reference types="tree-sitter-cli/dsl" />

export default grammar({
  name: 'xf86conf',

  extras: $ => [/\s+/, $.comment],

  rules: {
    file: $ => repeat($.section),

    comment: $ => seq('#', /\s*/, alias(/[^\n]*/, $.body)),

    section: $ => seq(
      'Section',
      $.section_name,
      $.body,
      'EndSection'
    ),

    body: $ => repeat1(choice(
      $.subsection,
      $.directive
    )),

    subsection: $ => seq(
      'SubSection',
      $.section_name,
      $.body,
      'EndSubSection'
    ),


    section_name: $ => seq('"', $.name, '"'),
    name: _ => choice(
      'InputDevice',
      'InputClass',
      'Monitor',
      'Modes',
      'Screen',
      'Device',
      'ServerLayout',
      'Module',
      'Extensions',
      'Files',
      'ServerFlags',
      'DRI',
      'Vendor',
      'Pointer',
      'Keyboard',
    ),

    directive: $ => seq($.identifier, $._value),
    identifier: _ => /[A-Za-z_][A-Za-z0-9_]*/,

    _value: $ => choice(
      repeat1($.string),
      repeat1($.int),
      $.float,
      $.range,
    ),

    string: _ => token(seq(
      '"',
      repeat(/[^"\\]/),
      '"'
    )),

    _int: _ => /\d+/,
    int: $ => $._int,
    float: $ =>
      prec(2, choice(seq(optional($._int), ".", $._int), seq($._int, "."))),
    range: $ => choice(
      seq($.int, token.immediate('-'), $.int),
      seq($.float, token.immediate('-'), $.float),
    ),
  }
});
