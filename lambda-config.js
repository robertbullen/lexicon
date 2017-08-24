/*
module.exports = {
  accessKeyId: <access key id>,  // optional
  secretAccessKey: <secret access key>,  // optional
  sessionToken: <sessionToken for assuming roles>,  // optional
  profile: <shared credentials profile name>, // optional for loading AWS credientail from custom profile
  region: 'us-east-1',
  handler: 'index.handler',
  role: <role arn>,
  functionName: <function name>,
  timeout: 10,
  memorySize: 128,
  publish: true, // default: false,
  runtime: 'nodejs4.3', // default: 'nodejs4.3',
  vpc: { // optional
    SecurityGroupIds: [<security group id>, ...],
    SubnetIds: [<subnet id>, ...]
  },
  eventSource: {
    EventSourceArn: <event source such as kinesis ARN>,
    BatchSize: 200,
    StartingPosition: "TRIM_HORIZON"
  }
}
*/

module.exports = {
  functionName: 'TheGeorgeSchwartzLexicon',
  handler: 'index.default',
  memorySize: 128,
  profile: 'personal',
  publish: true, // default: false,
  region: 'us-east-1',
  role: 'arn:aws:iam::761550682392:role/lambda_basic_execution',
  runtime: 'nodejs6.10',
  timeout: 7
};
