{
  pkgs ? import <nixpkgs> { },
}:

with pkgs;
mkShell {
  name = "tree-sitter-xf86conf";
  buildInputs = [
    tree-sitter
    bun
    cargo
    uv
  ];
}
