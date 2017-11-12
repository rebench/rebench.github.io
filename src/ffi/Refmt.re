type ast;

[@bs.val] [@bs.module "reason"] external parseRE : string => ast = "";
[@bs.val] [@bs.module "reason"] external printML : ast => string = "";