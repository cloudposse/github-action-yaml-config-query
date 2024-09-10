import * as github from '@actions/github'
import * as core from '@actions/core'
import {GitHub} from '@actions/github/lib/utils'
import {PR} from '../types/pull-request'

export default async function getPullRequestByID(
  octokit: InstanceType<typeof GitHub>,
  id: number
): Promise<PR> {
  const result = await octokit.rest.pulls.get({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: id
  });
  core.debug(`Used url to fetch associated PRs: ${result.url}`)
  return result.data
}
