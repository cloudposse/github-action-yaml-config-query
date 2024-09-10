import * as core from '@actions/core'
import {PRSimple, PR} from '../types/pull-request'

function setOutputWithDebug(key: string, value: unknown): void {
  core.debug(`Setting output: key: "${key}", value: "${value}"`)
  core.setOutput(key, value)
}

export default function setOutput(pr: PRSimple | PR | null): void {
  setOutputWithDebug('found', !!pr)
  if (pr) {
    setOutputWithDebug('number', pr.number.toString())
    setOutputWithDebug('json', JSON.stringify(pr))
    setOutputWithDebug('title', pr.title)
    setOutputWithDebug('body', pr.body)
    setOutputWithDebug('url', pr.html_url)
    setOutputWithDebug('created_at', pr.created_at)
    setOutputWithDebug('merged_at', pr.merged_at)
    setOutputWithDebug('closed_at', pr.closed_at)
    setOutputWithDebug('labels', pr.labels.map(e => e.name).join(','))
  }
}
