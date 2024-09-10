import * as core from '@actions/core'
import * as github from '@actions/github'
import getInputs from './io/get-inputs'
import getLastPullRequest from './get-last-pr'
import getPRsAssociatedWithCommit from './adapter/get-prs-associated-with-commit'
import setOutput from './io/set-output'
import getPullRequestByID from "./adapter/get-pr-by-id";

async function main(): Promise<void> {
  try {
    const {token, id, sha, filterOutClosed, filterOutDraft} = getInputs()
    const octokit = github.getOctokit(token)

    let allPRs = await getPRsAssociatedWithCommit(octokit, sha)

    const pr = id ? await getPullRequestByID(octokit, id) : getLastPullRequest(allPRs, {
      draft: !filterOutDraft,
      closed: !filterOutClosed,
      preferWithHeadSha: sha
    })

    setOutput(pr)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

main()
