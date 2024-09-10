import * as core from '@actions/core'

function setOutputWithDebug(key: string, value: unknown): void {
  core.debug(`Setting output: key: "${key}", value: "${value}"`)
  core.setOutput(key, value)
}

export default function setOutput(outputs: Map<string, string>): void {
  setOutputWithDebug('found', 1)
}
