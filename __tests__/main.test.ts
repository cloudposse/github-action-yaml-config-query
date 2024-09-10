import {expect, test} from '@jest/globals'
import query_config from "../src/query_config";

// @ts-ignore

describe('action', () => {
    it('simple query', async () => {
        let query = '.'
        let config = `
        test: foo
        bar: bar
        `;
        let result = query_config(query, config)
        expect(result.get('test')).toBe('foo')
        expect(result.get('bar')).toBe('bar')
    })

    it('complex query', async () => {
        let query = '.yes'
        let config = `
        yes:
            test: foo
            bar: bar
        no:
            test: bar
            bar: foo
        `;
        let result = query_config(query, config)
        expect(result.get('test')).toBe('foo')
        expect(result.get('bar')).toBe('bar')
    })

    it('struct query', async () => {
        let query = '.'
        let config = `
        test:
          foo:
            bar
        bar:
          test:
            foo
        `;
        let result = query_config(query, config)
        expect(result.get('test')).toBe('{"foo":"bar"}')
        expect(result.get('bar')).toBe('{"test":"foo"}')
    })
})