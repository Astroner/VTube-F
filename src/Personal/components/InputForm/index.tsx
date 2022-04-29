import { useService } from '@dogonis/react-injectable';
import React, { memo, FC, useState, FormEventHandler } from 'react';
import { UserService } from '../../../services/user.service';

import cn from "./InputForm.module.scss";

export interface IInputForm {}

const InputForm: FC<IInputForm> = props => {
    const user = useService(UserService);

    const [value, setValue] = useState("");

    const submit: FormEventHandler = e => {
        e.preventDefault();
        user.login(value)
    }

    return (
        <form onSubmit={submit} className={cn.root}>
            <input 
                className={cn.input} 
                placeholder="Print PSID"
                value={value} 
                onChange={e => setValue(e.target.value)} 
            />
            <button className={cn.button}>
                Print
            </button>
        </form>
    )
}

export default memo(InputForm)
