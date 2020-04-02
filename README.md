# grpc-node-course-dynamic-codegen
Dynamic Codegen with gRPC Nodejs - 

Install the following modules:

`npm install grpc`

`npm install @grpc/proto-loader`

## Generate

### Greet

```shell
grpc_tools_node_protoc -I=. ./protos/greet.proto \
  --js_out=import_style=commonjs,binary:./server \
  --grpc_out=./server \
  --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`
```

```shell
protoc -I=. ./protos/greet.proto \
  --js_out=import_style=commonjs,binary:./server \
  --grpc_out=./server \
  --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`
```

### Calculator

```shell
protoc -I=. ./protos/calculator.proto \
  --js_out=import_style=commonjs,binary:./server \
  --grpc_out=./server \
  --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin`
```
