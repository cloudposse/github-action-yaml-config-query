import * as core from '@actions/core'
import getInputs from './io/get-inputs'
import query_config from './query_config'
import setOutput from './io/set-output'

async function main(): Promise<void> {
  try {
    const {query, config} = getInputs()

    let result = query_config(query, config)
    setOutput(result)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

main()
