{map, concat, concatMap, difference, nub, union} = require './functional-helpers'
exports = module?.exports ? this

# TODO: stop reusing AssignOp and make a DefaultOp for use in param lists; that was a bad idea in the first place and you should be ashamed
# TODO: make sure all the type signatures are correct

createNodes = (subclasses, superclasses = []) ->
  for own className, specs of subclasses then do (className) ->

    superclass = superclasses[0] ? ->
    isCategory = specs? and specs.length is 2
    params =
      if specs?
        switch specs.length
          when 0 then []
          when 1, 2 then specs[0]
      else null
    params ?= superclass::childNodes ? []

    klass = class extends superclass
      constructor:
        if isCategory then ->
        else ->
          for param, i in params
            @[param] = arguments[i]
          @initialise?.apply this, arguments
          this
      className: className
      @superclasses = superclasses
    if specs?[0]? then klass::childNodes = specs[0]

    if isCategory then createNodes specs[1], [klass, superclasses...]
    exports[className] = klass

  return


# TODO: match parser API: consequent, alternate
# TODO: match parser API: block -> body
createNodes
  Nodes: [ [],

    BinOps: [ ['left', 'right'],
      AssignOps: [ ['assignee', 'expression'],
        AssignOp: null # :: Assignables -> Exprs -> AssignOp
        ClassProtoAssignOp: null # :: ObjectInitialiserKeys -> Exprs -> ClassProtoAssignOp
        CompoundAssignOp: [['op', 'assignee', 'expression']] # :: string -> Assignables -> Exprs -> CompoundAssignOp
        ExistsAssignOp: null # :: Assignables -> Exprs -> ExistsAssignOp
      ]
      BitOps: [ null
        BitAndOp: null # :: Exprs -> Exprs -> BitAndOp
        BitOrOp: null # :: Exprs -> Exprs -> BitOrOp
        BitXorOp: null # :: Exprs -> Exprs -> BitXorOp
        LeftShiftOp: null # :: Exprs -> Exprs -> LeftShiftOp
        SignedRightShiftOp: null # :: Exprs -> Exprs -> SignedRightShiftOp
        UnsignedRightShiftOp: null # :: Exprs -> Exprs -> UnsignedRightShiftOp
      ]
      ComparisonOps: [ null
        EQOp: null # :: Exprs -> Exprs -> EQOp
        GTEOp: null # :: Exprs -> Exprs -> GTEOp
        GTOp: null # :: Exprs -> Exprs -> GTOp
        LTEOp: null # :: Exprs -> Exprs -> LTEOp
        LTOp: null # :: Exprs -> Exprs -> LTOp
        NEQOp: null # :: Exprs -> Exprs -> NEQOp
      ]
      # Note: A tree of ConcatOp represents interpolation
      ConcatOp: null # :: Exprs -> Exprs -> ConcatOp
      ExistsOp: null # :: Exprs -> Exprs -> ExistsOp
      ExtendsOp: null # :: Exprs -> Exprs -> ExtendsOp
      InOp: null # :: Exprs -> Exprs -> InOp
      InstanceofOp: null # :: Exprs -> Exprs -> InstanceofOp
      LogicalOps: [ null
        LogicalAndOp: null # :: Exprs -> Exprs -> LogicalAndOp
        LogicalOrOp: null # :: Exprs -> Exprs -> LogicalOrOp
      ]
      MathsOps: [ null
        DivideOp: null # :: Exprs -> Exprs -> DivideOp
        MultiplyOp: null # :: Exprs -> Exprs -> MultiplyOp
        RemOp: null # :: Exprs -> Exprs -> RemOp
        SubtractOp: null # :: Exprs -> Exprs -> SubtractOp
      ]
      OfOp: null # :: Exprs -> Exprs -> OfOp
      PlusOp: null # :: Exprs -> Exprs -> PlusOp
      Range: [['isInclusive', 'left', 'right']] # :: bool -> Exprs -> Exprs -> Range
      SeqOp: null # :: Exprs -> Exprs -> SeqOp
    ]

    Statements: [ [],
      Break: null # :: Break
      Continue: null # :: Continue
      Return: [['expression']] # :: Maybe Exprs -> Return
      Throw: [['expression']] # :: Exprs -> Throw
    ]

    UnaryOps: [ ['expression'],
      BitNotOp: null # :: Exprs -> BitNotOp
      DeleteOp: null # :: MemberAccessOps -> DeleteOp
      DoOp: null # :: Exprs -> DoOp
      LogicalNotOp: null # :: Exprs -> LogicalNotOp
      NewOp: [['ctor', 'arguments']] # :: Exprs -> [Arguments] -> NewOp
      PreDecrementOp: null # :: Exprs -> PreDecrementOp
      PreIncrementOp: null # :: Exprs -> PreIncrementOp
      PostDecrementOp: null # :: Exprs -> PostDecrementOp
      PostIncrementOp: null # :: Exprs -> PostIncrementOp
      TypeofOp: null # :: Exprs -> TypeofOp
      UnaryExistsOp: null # :: Exprs -> UnaryExistsOp
      UnaryNegateOp: null # :: Exprs -> UnaryNegateOp
      UnaryPlusOp: null # :: Exprs -> UnaryPlusOp
    ]

    MemberAccessOps: [ null
      StaticMemberAccessOps: [ ['expression', 'memberName'],
        MemberAccessOp: null # :: Exprs -> MemberNames -> MemberAccessOp
        ProtoMemberAccessOp: null # :: Exprs -> MemberNames -> ProtoMemberAccessOp
        SoakedMemberAccessOp: null # :: Exprs -> MemberNames -> SoakedMemberAccessOp
        SoakedProtoMemberAccessOp: null # :: Exprs -> MemberNames -> SoakedProtoMemberAccessOp
      ]
      DynamicMemberAccessOps: [ ['expression', 'indexingExpr'],
        DynamicMemberAccessOp: null # :: Exprs -> Exprs -> DynamicMemberAccessOp
        DynamicProtoMemberAccessOp: null # :: Exprs -> Exprs -> DynamicProtoMemberAccessOp
        SoakedDynamicMemberAccessOp: null # :: Exprs -> Exprs -> SoakedDynamicMemberAccessOp
        SoakedDynamicProtoMemberAccessOp: null # :: Exprs -> Exprs -> SoakedDynamicProtoMemberAccessOp
      ]
    ]

    FunctionApplications: [ ['function', 'arguments'],
      FunctionApplication: null # :: Exprs -> [Arguments] -> FunctionApplication
      SoakedFunctionApplication: null # :: Exprs -> [Arguments] -> SoakedFunctionApplication
    ]
    Super: [['arguments']] # :: [Arguments] -> Super

    Program: [['block']] # :: Maybe Exprs -> Program
    Block: [['statements']] # :: [Statement] -> Block
    # TODO: test/consequent/alternative
    Conditional: [['condition', 'block', 'elseBlock']] # :: Exprs -> Maybe Exprs -> Maybe Exprs -> Conditional
    ForIn: [['valAssignee', 'keyAssignee', 'expression', 'step', 'filterExpr', 'block']] # :: Assignable -> Maybe Assignable -> Exprs -> Exprs -> Maybe Exprs -> Maybe Exprs -> ForIn
    ForOf: [['isOwn', 'keyAssignee', 'valAssignee', 'expression', 'filterExpr', 'block']] # :: bool -> Assignable -> Maybe Assignable -> Exprs -> Maybe Exprs -> Maybe Exprs -> ForOf
    Switch: [['expression', 'cases', 'elseBlock']] # :: Maybe Exprs -> [SwitchCase] -> Maybe Exprs -> Switch
    # TODO: test/consequent
    SwitchCase: [['conditions', 'block']] # :: [Exprs] -> Maybe Expr -> SwitchCase
    Try: [['block', 'catchAssignee', 'catchBlock', 'finallyBlock']] # :: Exprs -> Maybe Assignable -> Maybe Exprs -> Maybe Exprs -> Try
    While: [['condition', 'block']] # :: Exprs -> Maybe Exprs -> While

    ArrayInitialiser: [['members']] # :: [ArrayInitialiserMembers] -> ArrayInitialiser
    ObjectInitialiser: [['members']] # :: [ObjectInitialiserMember] -> ObjectInitialiser
    ObjectInitialiserMember: [['key', 'expression']] # :: ObjectInitialiserKeys -> Exprs -> ObjectInitialiserMember
    Class: [['nameAssignee', 'parent', 'block']] # :: Maybe Assignable -> Maybe Exprs -> Maybe Exprs -> Class
    Functions: [ ['parameters', 'block'],
      Function: null # :: [Parameters] -> Maybe Exprs -> Function
      BoundFunction: null # :: [Parameters] -> Maybe Exprs -> BoundFunction
    ]
    Identifiers: [ ['data'],
      Identifier: null # :: string -> Identifier
      GenSym: null # :: string -> string -> GenSym
    ]
    Null: null # :: Null
    Primitives: [ ['data'],
      Bool: null # :: bool -> Bool
      JavaScript: null # :: string -> JavaScript
      Numbers: [ null,
        Int: null # :: float -> Int
        Float: null # :: float -> Float
      ]
      String: null # :: string -> String
    ]
    RegExps: [ null
      RegExp: [['data', 'flags']] # :: string -> [string] -> RegExp
      HeregExp: [['expression', 'flags']] # :: Exprs -> [string] -> HeregExp
    ]
    This: null # :: This
    Undefined: null # :: Undefined

    Slice: [['expression', 'isInclusive', 'left', 'right']] # :: Exprs -> bool -> Maybe Exprs -> Maybe Exprs -> Slice

    Rest: [['expression']] # :: Exprs -> Rest
    Spread: [['expression']] # :: Exprs -> Spread
  ]


{
  Nodes, Primitives, CompoundAssignOp, StaticMemberAccessOps, Range,
  ArrayInitialiser, ObjectInitialiser, NegatedConditional, Conditional,
  Identifier, ForOf, Functions, While, Class, Block, NewOp, Bool,
  FunctionApplications, RegExps, RegExp, HeregExp, Super, Slice, Switch,
  Identifiers, SwitchCase, GenSym
} = exports


Nodes.fromJSON = (json) -> exports[json.type].fromJSON json
Nodes::listMembers = []
Nodes::toJSON = ->
  json = type: "CS.#{@className}"
  for child in @childNodes
    if child in @listMembers
      json[child] = (p.toJSON() for p in @[child])
    else
      json[child] = @[child]?.toJSON()
  json
Nodes::fold = (memo, fn) ->
  for child in @childNodes
    if child in @listMembers
      memo = (p.fold memo, fn for p in @[child])
    else
      memo = @[child].fold memo, fn
  fn memo, this
Nodes::instanceof = (ctors...) ->
  # not a fold for efficiency's sake
  superclasses = map @constructor.superclasses, (c) -> c::className
  for ctor in ctors when ctor::className in [@className, superclasses...]
    return yes
  no
#Node::r = (@raw) -> this
Nodes::r = -> this
Nodes::p = (@line, @column) -> this
Nodes::generated = no
Nodes::g = ->
  @generated = yes
  this


## Nodes that contain primitive properties

handlePrimitives = (ctor, primitives) ->
  ctor::childNodes = difference ctor::childNodes, primitives
  ctor::toJSON = ->
    json = Nodes::toJSON.call this
    for primitive in primitives
      json[primitive] = @[primitive]
    json

handlePrimitives CompoundAssignOp, ['op']
handlePrimitives ForOf, ['isOwn']
handlePrimitives HeregExp, ['flags']
handlePrimitives Identifiers, ['data']
handlePrimitives Primitives, ['data']
handlePrimitives Range, ['isInclusive']
handlePrimitives RegExp, ['data', 'flags']
handlePrimitives Slice, ['isInclusive']
handlePrimitives StaticMemberAccessOps, ['memberName']


## Nodes that contain list properties

handleLists = (ctor, listProps) -> ctor::listMembers = listProps

handleLists ArrayInitialiser, ['members']
handleLists Block, ['statements']
handleLists Functions, ['parameters']
handleLists FunctionApplications, ['arguments']
handleLists NewOp, ['arguments']
handleLists ObjectInitialiser, ['members']
handleLists Super, ['arguments']
handleLists Switch, ['cases']
handleLists SwitchCase, ['conditions']


## Nodes with special behaviours

Block.wrap = (s) -> new Block(if s? then [s] else []).r(s.raw).p(s.line, s.column)

Class::initialise = ->
  @name = new GenSym 'class'
  if @nameAssignee?
    # TODO: factor this out, as it's useful elsewhere: short object literal members, NFEs from assignee, etc.
    @name = switch
      when @nameAssignee.instanceof Identifier
        new Identifier @nameAssignee.data
      when @nameAssignee.instanceof StaticMemberAccessOps
        new Identifier @nameAssignee.memberName
      else @name

ObjectInitialiser::keys = -> map @members, (m) -> m.key
ObjectInitialiser::vals = -> map @members, (m) -> m.expression

RegExps::initialise = (_, flags) ->
  @flags = {}
  for flag in ['g', 'i', 'm', 'y']
    @flags[flag] = flag in flags


## Syntactic nodes

# Note: This only represents the original syntactic specification as an
# "unless". The node should be treated in all other ways as a Conditional.
# NegatedConditional :: Exprs -> Maybe Exprs -> Maybe Exprs -> NegatedConditional
class exports.NegatedConditional extends Conditional

# Note: This only represents the original syntactic specification as an
# "until". The node should be treated in all other ways as a While.
# NegatedWhile :: Exprs -> Maybe Exprs -> NegatedWhile
class exports.NegatedWhile extends While

# Note: This only represents the original syntactic specification as a "loop".
# The node should be treated in all other ways as a While.
# Loop :: Maybe Exprs -> Loop
class exports.Loop extends While
  constructor: (block) -> super (new Bool true).g(), block
