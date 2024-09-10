import * as core from '@actions/core'

type ActionInput = {
  query: string
  config: string
}

export default function getInputs(): ActionInput {
  const query = core.getInput('query', {required: true})
  const config = core.getInput('config', {required: true})
  return {
    query,
    config
  }
}
