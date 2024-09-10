import { evaluate, parse } from '@jq-tools/jq';
import YAML from 'yaml'

export default function query_config(
  query: string,
  config: string,
): Map<string, string> {


  let yaml_struct = YAML.parse(config)
  const result  = Array.from(evaluate(parse(query), [yaml_struct]))[0];

  let test= Object.fromEntries(
      Object.entries(result).map(
          ([key, value]) => [key, typeof value  == "string" ? value : JSON.stringify(value)]
      )
  );
  return new Map<string, string>(Object.entries(test))
}
