import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { FC } from 'react';
import { CardChildProps } from '../interfaces';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import count from '../../../utils/count';
import { checkValidationAds } from '../../../utils/validate';

const CardChildCamp: FC<CardChildProps> = (props) => {

    return (
        <Card className={props.id === props.ind ? 'card-child-camp' : 'card-child-camp-default'} onClick={props.onClick}>
            <CardHeader
                title={<Typography
                    variant="h6"
                    component="span"
                    className={(props.isError && checkValidationAds(props.subCampData)) ? 'text-header-card-error' : 'text-header-card'}
                >
                    {props.subCampData.name}
                    <CheckCircleIcon className={props.subCampData.status ? 'checkbox-icon' : 'checkbox-icon-disable'} />
                </Typography>}
                className='card-header-child'
            >
            </CardHeader>
            <CardContent
                className='text-content-card'
            >
                <Typography
                    variant="h5"
                    component="div"
                >
                    {count(props.subCampData.ads)}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CardChildCamp;
