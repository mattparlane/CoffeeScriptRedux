// Generated by CoffeeScript 1.3.3
var ArrayInitialiser, Block, Bool, Class, CompoundAssignOp, Conditional, ForOf, FunctionApplications, Functions, GenSym, HeregExp, Identifier, Identifiers, NegatedConditional, NewOp, Nodes, ObjectInitialiser, Primitives, Range, RegExp, RegExps, Slice, StaticMemberAccessOps, Super, Switch, SwitchCase, While, concat, concatMap, createNodes, difference, exports, handleLists, handlePrimitives, map, nub, union, _ref, _ref1,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __slice = [].slice,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_ref = require('./functional-helpers'), map = _ref.map, concat = _ref.concat, concatMap = _ref.concatMap, difference = _ref.difference, nub = _ref.nub, union = _ref.union;

exports = (_ref1 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref1 : this;

createNodes = function(subclasses, superclasses) {
  var className, specs, _fn;
  if (superclasses == null) {
    superclasses = [];
  }
  _fn = function(className) {
    var isCategory, klass, params, superclass, _class, _ref2, _ref3;
    superclass = (_ref2 = superclasses[0]) != null ? _ref2 : function() {};
    isCategory = (specs != null) && specs.length === 2;
    params = (function() {
      if (specs != null) {
        switch (specs.length) {
          case 0:
            return [];
          case 1:
          case 2:
            return specs[0];
        }
      } else {
        return null;
      }
    })();
    if (params == null) {
      params = (_ref3 = superclass.prototype.childNodes) != null ? _ref3 : [];
    }
    klass = (function(_super) {

      __extends(_Class, _super);

      function _Class() {
        _Class.__super__.constructor.apply(this, arguments);
        return _class.apply(this, arguments);
      }

      _class = isCategory ? function() {} : function() {
        var i, param, _i, _len, _ref4;
        for (i = _i = 0, _len = params.length; _i < _len; i = ++_i) {
          param = params[i];
          this[param] = arguments[i];
        }
        if ((_ref4 = this.initialise) != null) {
          _ref4.apply(this, arguments);
        }
        return this;
      };

      _Class.prototype.className = className;

      _Class.superclasses = superclasses;

      return _Class;

    })(superclass);
    if ((specs != null ? specs[0] : void 0) != null) {
      klass.prototype.childNodes = specs[0];
    }
    if (isCategory) {
      createNodes(specs[1], [klass].concat(__slice.call(superclasses)));
    }
    return exports[className] = klass;
  };
  for (className in subclasses) {
    if (!__hasProp.call(subclasses, className)) continue;
    specs = subclasses[className];
    _fn(className);
  }
};

createNodes({
  Nodes: [
    [], {
      BinOps: [
        ['left', 'right'], {
          AssignOps: [
            ['assignee', 'expression'], {
              AssignOp: null,
              ClassProtoAssignOp: null,
              CompoundAssignOp: [['op', 'assignee', 'expression']],
              ExistsAssignOp: null
            }
          ],
          BitOps: [
            null, {
              BitAndOp: null,
              BitOrOp: null,
              BitXorOp: null,
              LeftShiftOp: null,
              SignedRightShiftOp: null,
              UnsignedRightShiftOp: null
            }
          ],
          ComparisonOps: [
            null, {
              EQOp: null,
              GTEOp: null,
              GTOp: null,
              LTEOp: null,
              LTOp: null,
              NEQOp: null
            }
          ],
          ConcatOp: null,
          ExistsOp: null,
          ExtendsOp: null,
          InOp: null,
          InstanceofOp: null,
          LogicalOps: [
            null, {
              LogicalAndOp: null,
              LogicalOrOp: null
            }
          ],
          MathsOps: [
            null, {
              DivideOp: null,
              MultiplyOp: null,
              RemOp: null,
              SubtractOp: null
            }
          ],
          OfOp: null,
          PlusOp: null,
          Range: [['isInclusive', 'left', 'right']],
          SeqOp: null
        }
      ],
      Statements: [
        [], {
          Break: null,
          Continue: null,
          Return: [['expression']],
          Throw: [['expression']]
        }
      ],
      UnaryOps: [
        ['expression'], {
          BitNotOp: null,
          DeleteOp: null,
          DoOp: null,
          LogicalNotOp: null,
          NewOp: [['ctor', 'arguments']],
          PreDecrementOp: null,
          PreIncrementOp: null,
          PostDecrementOp: null,
          PostIncrementOp: null,
          TypeofOp: null,
          UnaryExistsOp: null,
          UnaryNegateOp: null,
          UnaryPlusOp: null
        }
      ],
      MemberAccessOps: [
        null, {
          StaticMemberAccessOps: [
            ['expression', 'memberName'], {
              MemberAccessOp: null,
              ProtoMemberAccessOp: null,
              SoakedMemberAccessOp: null,
              SoakedProtoMemberAccessOp: null
            }
          ],
          DynamicMemberAccessOps: [
            ['expression', 'indexingExpr'], {
              DynamicMemberAccessOp: null,
              DynamicProtoMemberAccessOp: null,
              SoakedDynamicMemberAccessOp: null,
              SoakedDynamicProtoMemberAccessOp: null
            }
          ]
        }
      ],
      FunctionApplications: [
        ['function', 'arguments'], {
          FunctionApplication: null,
          SoakedFunctionApplication: null
        }
      ],
      Super: [['arguments']],
      Program: [['block']],
      Block: [['statements']],
      Conditional: [['condition', 'block', 'elseBlock']],
      ForIn: [['valAssignee', 'keyAssignee', 'expression', 'step', 'filterExpr', 'block']],
      ForOf: [['isOwn', 'keyAssignee', 'valAssignee', 'expression', 'filterExpr', 'block']],
      Switch: [['expression', 'cases', 'elseBlock']],
      SwitchCase: [['conditions', 'block']],
      Try: [['block', 'catchAssignee', 'catchBlock', 'finallyBlock']],
      While: [['condition', 'block']],
      ArrayInitialiser: [['members']],
      ObjectInitialiser: [['members']],
      ObjectInitialiserMember: [['key', 'expression']],
      Class: [['nameAssignee', 'parent', 'block']],
      Functions: [
        ['parameters', 'block'], {
          Function: null,
          BoundFunction: null
        }
      ],
      Identifiers: [
        ['data'], {
          Identifier: null,
          GenSym: null
        }
      ],
      Null: null,
      Primitives: [
        ['data'], {
          Bool: null,
          JavaScript: null,
          Numbers: [
            null, {
              Int: null,
              Float: null
            }
          ],
          String: null
        }
      ],
      RegExps: [
        null, {
          RegExp: [['data', 'flags']],
          HeregExp: [['expression', 'flags']]
        }
      ],
      This: null,
      Undefined: null,
      Slice: [['expression', 'isInclusive', 'left', 'right']],
      Rest: [['expression']],
      Spread: [['expression']]
    }
  ]
});

Nodes = exports.Nodes, Primitives = exports.Primitives, CompoundAssignOp = exports.CompoundAssignOp, StaticMemberAccessOps = exports.StaticMemberAccessOps, Range = exports.Range, ArrayInitialiser = exports.ArrayInitialiser, ObjectInitialiser = exports.ObjectInitialiser, NegatedConditional = exports.NegatedConditional, Conditional = exports.Conditional, Identifier = exports.Identifier, ForOf = exports.ForOf, Functions = exports.Functions, While = exports.While, Class = exports.Class, Block = exports.Block, NewOp = exports.NewOp, Bool = exports.Bool, FunctionApplications = exports.FunctionApplications, RegExps = exports.RegExps, RegExp = exports.RegExp, HeregExp = exports.HeregExp, Super = exports.Super, Slice = exports.Slice, Switch = exports.Switch, Identifiers = exports.Identifiers, SwitchCase = exports.SwitchCase, GenSym = exports.GenSym;

Nodes.fromJSON = function(json) {
  return exports[json.type].fromJSON(json);
};

Nodes.prototype.listMembers = [];

Nodes.prototype.toJSON = function() {
  var child, json, p, _i, _len, _ref2, _ref3;
  json = {
    type: "CS." + this.className
  };
  _ref2 = this.childNodes;
  for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
    child = _ref2[_i];
    if (__indexOf.call(this.listMembers, child) >= 0) {
      json[child] = (function() {
        var _j, _len1, _ref3, _results;
        _ref3 = this[child];
        _results = [];
        for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
          p = _ref3[_j];
          _results.push(p.toJSON());
        }
        return _results;
      }).call(this);
    } else {
      json[child] = (_ref3 = this[child]) != null ? _ref3.toJSON() : void 0;
    }
  }
  return json;
};

Nodes.prototype.fold = function(memo, fn) {
  var child, p, _i, _len, _ref2;
  _ref2 = this.childNodes;
  for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
    child = _ref2[_i];
    if (__indexOf.call(this.listMembers, child) >= 0) {
      memo = (function() {
        var _j, _len1, _ref3, _results;
        _ref3 = this[child];
        _results = [];
        for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
          p = _ref3[_j];
          _results.push(p.fold(memo, fn));
        }
        return _results;
      }).call(this);
    } else {
      memo = this[child].fold(memo, fn);
    }
  }
  return fn(memo, this);
};

Nodes.prototype["instanceof"] = function() {
  var ctor, ctors, superclasses, _i, _len, _ref2;
  ctors = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  superclasses = map(this.constructor.superclasses, function(c) {
    return c.prototype.className;
  });
  for (_i = 0, _len = ctors.length; _i < _len; _i++) {
    ctor = ctors[_i];
    if (_ref2 = ctor.prototype.className, __indexOf.call([this.className].concat(__slice.call(superclasses)), _ref2) >= 0) {
      return true;
    }
  }
  return false;
};

Nodes.prototype.r = function() {
  return this;
};

Nodes.prototype.p = function(line, column) {
  this.line = line;
  this.column = column;
  return this;
};

Nodes.prototype.generated = false;

Nodes.prototype.g = function() {
  this.generated = true;
  return this;
};

handlePrimitives = function(ctor, primitives) {
  ctor.prototype.childNodes = difference(ctor.prototype.childNodes, primitives);
  return ctor.prototype.toJSON = function() {
    var json, primitive, _i, _len;
    json = Nodes.prototype.toJSON.call(this);
    for (_i = 0, _len = primitives.length; _i < _len; _i++) {
      primitive = primitives[_i];
      json[primitive] = this[primitive];
    }
    return json;
  };
};

handlePrimitives(CompoundAssignOp, ['op']);

handlePrimitives(ForOf, ['isOwn']);

handlePrimitives(HeregExp, ['flags']);

handlePrimitives(Identifiers, ['data']);

handlePrimitives(Primitives, ['data']);

handlePrimitives(Range, ['isInclusive']);

handlePrimitives(RegExp, ['data', 'flags']);

handlePrimitives(Slice, ['isInclusive']);

handlePrimitives(StaticMemberAccessOps, ['memberName']);

handleLists = function(ctor, listProps) {
  return ctor.prototype.listMembers = listProps;
};

handleLists(ArrayInitialiser, ['members']);

handleLists(Block, ['statements']);

handleLists(Functions, ['parameters']);

handleLists(FunctionApplications, ['arguments']);

handleLists(NewOp, ['arguments']);

handleLists(ObjectInitialiser, ['members']);

handleLists(Super, ['arguments']);

handleLists(Switch, ['cases']);

handleLists(SwitchCase, ['conditions']);

Block.wrap = function(s) {
  return new Block(s != null ? [s] : []).r(s.raw).p(s.line, s.column);
};

Class.prototype.initialise = function() {
  this.name = new GenSym('class');
  if (this.nameAssignee != null) {
    return this.name = (function() {
      switch (false) {
        case !this.nameAssignee["instanceof"](Identifier):
          return new Identifier(this.nameAssignee.data);
        case !this.nameAssignee["instanceof"](StaticMemberAccessOps):
          return new Identifier(this.nameAssignee.memberName);
        default:
          return this.name;
      }
    }).call(this);
  }
};

ObjectInitialiser.prototype.keys = function() {
  return map(this.members, function(m) {
    return m.key;
  });
};

ObjectInitialiser.prototype.vals = function() {
  return map(this.members, function(m) {
    return m.expression;
  });
};

RegExps.prototype.initialise = function(_, flags) {
  var flag, _i, _len, _ref2, _results;
  this.flags = {};
  _ref2 = ['g', 'i', 'm', 'y'];
  _results = [];
  for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
    flag = _ref2[_i];
    _results.push(this.flags[flag] = __indexOf.call(flags, flag) >= 0);
  }
  return _results;
};

exports.NegatedConditional = (function(_super) {

  __extends(NegatedConditional, _super);

  function NegatedConditional() {
    return NegatedConditional.__super__.constructor.apply(this, arguments);
  }

  return NegatedConditional;

})(Conditional);

exports.NegatedWhile = (function(_super) {

  __extends(NegatedWhile, _super);

  function NegatedWhile() {
    return NegatedWhile.__super__.constructor.apply(this, arguments);
  }

  return NegatedWhile;

})(While);

exports.Loop = (function(_super) {

  __extends(Loop, _super);

  function Loop(block) {
    Loop.__super__.constructor.call(this, (new Bool(true)).g(), block);
  }

  return Loop;

})(While);
