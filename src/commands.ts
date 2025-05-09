import command from './commands/command';
import { CommandSay } from './commands/commandsay';

const commands: command[] = [
    new CommandSay()
];

export default commands;