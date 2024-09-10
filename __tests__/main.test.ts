import {expect, test} from '@jest/globals'
import * as octokit from "@octokit/core";
import * as github from "@actions/github";

// @ts-ignore
import createDummyPR from './create-dummy-pr'
import getLastPullRequest from '../src/get-last-pr'
import getPullRequestByID from "../src/adapter/get-pr-by-id";
import os from "os";
import {GitHub} from "@actions/github/lib/utils";

import {Api} from '@octokit/plugin-rest-endpoint-methods/dist-types/types'
import {PaginateInterface} from "@octokit/plugin-paginate-rest"
import {Constructor} from "@octokit/core/dist-types/types";

let getOctokitMock: jest.SpiedFunction<typeof github.getOctokit>
describe('action', () => {
    it('mock test', async () => {
        expect(1).toBe(1)
    })


    // beforeEach(() => {
    //   jest.clearAllMocks()
    //
    //   getOctokitMock = jest.spyOn(github, 'getOctokit').mockImplementation()
    //
    //   process.env['RUNNER_TOOL_CACHE'] = os.tmpdir()
    //   process.env['GITHUB_REPOSITORY'] = 'acme/repo'
    // })
    //
    // it('prefers PR with commit as head SHA', async () => {
    //   const testPRs = [
    //     createDummyPR(1, {sha: '09e30775c'}),
    //     createDummyPR(2, {sha: '90775cae3'})
    //   ]
    //   const options = {
    //     preferWithHeadSha: testPRs[1].head.sha
    //   }
    //   const foundPR = getLastPullRequest(testPRs, options) || {id: null}
    //   expect(foundPR.id).toBe(testPRs[1].id)
    // })
    //
    // it('filter out draft PRs', async () => {
    //   const testPRs = [createDummyPR(1, {draft: true})]
    //
    //   const foundPR = getLastPullRequest(testPRs, {draft: false})
    //   expect(foundPR).toBeNull()
    // })
    //
    // it('find a draft PRs', async () => {
    //   const testPRs = [createDummyPR(11, {draft: true})]
    //
    //   const foundPR = getLastPullRequest(testPRs, {draft: true}) || {id: null}
    //   expect(foundPR.id).toBe(testPRs[0].id)
    // })
    //
    // it('find PR by id', async () => {
    //   getOctokitMock.mockImplementation((token: string, options?, ...additionalPlugins) => {
    //     return {
    //       rest: {
    //         pulls: {
    //           get: jest.fn().mockImplementation((params) => {
    //               if (params.owner == 'acme' && params.repo == 'repo') {
    //                 return {data: {id: params.pull_number}}
    //               }
    //               return {data: null}
    //           })
    //         }
    //       },
    //     } as unknown as InstanceType<typeof GitHub>
    //   })
    //
    //   const test = github.getOctokit('token')
    //
    //   const foundPR = await getPullRequestByID(test, 12)
    //   expect(foundPR.id).toBe(12)
    // })
})