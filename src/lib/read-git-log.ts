import { ChildProcess, spawn } from 'child_process';
import { IField } from '../typings';

const toNode = ({ name, placeholder }: IField) => `<${name}>${placeholder}</${name}>`;
const getNodes = (fields: IField[]) => fields.map(toNode).join('');

export const readGitLog = (directory: string, fields: IField[], oldestFirst: boolean = false) => {
  const baseArgs = ['log', `--pretty=format:<commit>${getNodes(fields)}</commit>`, '--author-date-order'];
  const args = oldestFirst === true ? baseArgs.concat('--reverse') : baseArgs;
  const task = spawn('git', args, { cwd: directory });
  task.stdout.setEncoding('utf8');
  task.stderr.setEncoding('utf8');
  return task;
};