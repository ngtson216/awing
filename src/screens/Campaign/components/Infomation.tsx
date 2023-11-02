import { TextField } from '@mui/material';
import React, { FC } from 'react';
import { InfomationProps } from '../interfaces';
import { checkNameCampaign } from '../../../utils/validate';

const InfomationTab: FC<InfomationProps> = (props) => {
    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setNameCamp(e.target.value);
    }

    const onChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setDesciption(e.target.value);
    }

    return (
        <>
            <TextField
                error={(props.isError && checkNameCampaign(props.name))}
                id="standard-error-helper-text"
                label="Tên chiến dịch *"
                helperText={(props.isError && checkNameCampaign(props.name)) ? "Dữ liệu không hợp lệ" : null}
                variant="standard"
                fullWidth
                className='form-control-margin'
                value={props.name}
                onChange={onChangeName}
            />
            <TextField
                id="standard-error-helper-text"
                label="Mô tả"
                variant="standard"
                fullWidth
                className='form-control-margin'
                value={props.desc}
                onChange={onChangeDesc}
            />
        </>
    );
}

export default InfomationTab;
