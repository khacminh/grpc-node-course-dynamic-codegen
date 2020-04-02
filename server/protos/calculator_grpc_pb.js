// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var protos_calculator_pb = require('../protos/calculator_pb.js');

function serialize_calculator_ComputeAverageRequest(arg) {
  if (!(arg instanceof protos_calculator_pb.ComputeAverageRequest)) {
    throw new Error('Expected argument of type calculator.ComputeAverageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_ComputeAverageRequest(buffer_arg) {
  return protos_calculator_pb.ComputeAverageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_ComputeAverageResponse(arg) {
  if (!(arg instanceof protos_calculator_pb.ComputeAverageResponse)) {
    throw new Error('Expected argument of type calculator.ComputeAverageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_ComputeAverageResponse(buffer_arg) {
  return protos_calculator_pb.ComputeAverageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_DecomposePrimeNumberRequest(arg) {
  if (!(arg instanceof protos_calculator_pb.DecomposePrimeNumberRequest)) {
    throw new Error('Expected argument of type calculator.DecomposePrimeNumberRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_DecomposePrimeNumberRequest(buffer_arg) {
  return protos_calculator_pb.DecomposePrimeNumberRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_DecomposePrimeNumberResponse(arg) {
  if (!(arg instanceof protos_calculator_pb.DecomposePrimeNumberResponse)) {
    throw new Error('Expected argument of type calculator.DecomposePrimeNumberResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_DecomposePrimeNumberResponse(buffer_arg) {
  return protos_calculator_pb.DecomposePrimeNumberResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_GetMaxRequest(arg) {
  if (!(arg instanceof protos_calculator_pb.GetMaxRequest)) {
    throw new Error('Expected argument of type calculator.GetMaxRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_GetMaxRequest(buffer_arg) {
  return protos_calculator_pb.GetMaxRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_GetMaxResponse(arg) {
  if (!(arg instanceof protos_calculator_pb.GetMaxResponse)) {
    throw new Error('Expected argument of type calculator.GetMaxResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_GetMaxResponse(buffer_arg) {
  return protos_calculator_pb.GetMaxResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumRequest(arg) {
  if (!(arg instanceof protos_calculator_pb.SumRequest)) {
    throw new Error('Expected argument of type calculator.SumRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumRequest(buffer_arg) {
  return protos_calculator_pb.SumRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_calculator_SumResponse(arg) {
  if (!(arg instanceof protos_calculator_pb.SumResponse)) {
    throw new Error('Expected argument of type calculator.SumResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_calculator_SumResponse(buffer_arg) {
  return protos_calculator_pb.SumResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CalculatorServiceService = exports.CalculatorServiceService = {
  // Unary API
sum: {
    path: '/calculator.CalculatorService/Sum',
    requestStream: false,
    responseStream: false,
    requestType: protos_calculator_pb.SumRequest,
    responseType: protos_calculator_pb.SumResponse,
    requestSerialize: serialize_calculator_SumRequest,
    requestDeserialize: deserialize_calculator_SumRequest,
    responseSerialize: serialize_calculator_SumResponse,
    responseDeserialize: deserialize_calculator_SumResponse,
  },
  // Streaming API
decomposePrimeNumber: {
    path: '/calculator.CalculatorService/DecomposePrimeNumber',
    requestStream: false,
    responseStream: true,
    requestType: protos_calculator_pb.DecomposePrimeNumberRequest,
    responseType: protos_calculator_pb.DecomposePrimeNumberResponse,
    requestSerialize: serialize_calculator_DecomposePrimeNumberRequest,
    requestDeserialize: deserialize_calculator_DecomposePrimeNumberRequest,
    responseSerialize: serialize_calculator_DecomposePrimeNumberResponse,
    responseDeserialize: deserialize_calculator_DecomposePrimeNumberResponse,
  },
  // Client Streaming API
computeAverage: {
    path: '/calculator.CalculatorService/ComputeAverage',
    requestStream: true,
    responseStream: false,
    requestType: protos_calculator_pb.ComputeAverageRequest,
    responseType: protos_calculator_pb.ComputeAverageResponse,
    requestSerialize: serialize_calculator_ComputeAverageRequest,
    requestDeserialize: deserialize_calculator_ComputeAverageRequest,
    responseSerialize: serialize_calculator_ComputeAverageResponse,
    responseDeserialize: deserialize_calculator_ComputeAverageResponse,
  },
  // BiDi Streaming API
getMax: {
    path: '/calculator.CalculatorService/GetMax',
    requestStream: true,
    responseStream: true,
    requestType: protos_calculator_pb.GetMaxRequest,
    responseType: protos_calculator_pb.GetMaxResponse,
    requestSerialize: serialize_calculator_GetMaxRequest,
    requestDeserialize: deserialize_calculator_GetMaxRequest,
    responseSerialize: serialize_calculator_GetMaxResponse,
    responseDeserialize: deserialize_calculator_GetMaxResponse,
  },
};

exports.CalculatorServiceClient = grpc.makeGenericClientConstructor(CalculatorServiceService);
