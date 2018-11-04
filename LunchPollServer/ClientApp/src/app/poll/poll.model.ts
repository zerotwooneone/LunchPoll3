import { PollOptionModel } from './poll-option.model';

export interface PollModel {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly options: PollOptionModel[];
}
