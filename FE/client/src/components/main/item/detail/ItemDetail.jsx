import React, { useState, useContext } from 'react'
import useFetch from '../../../../util/useFetch';
import URL from '../../../../constants/url';
import DetailImage from './DetailImage';
import DetailInfo from './DetailInfo';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { ItemContext } from '../Item';

const useStyles = makeStyles({
    dialogWrap: {
        position: 'relative',
        '& .detail-closeBtn': {
            position: 'absolute',
            top: '5px',
            right: '5px',
            cursor: 'pointer',
            color: '#b3b3b3',
            '&:hover': {
                color: '#5a5a5a',
            }
        },
    },
    contentWrap: {
        width: '800px',
        height: '380px',
        '& .detail-progress-wrap': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
        '& .detail-data-wrap': {
            display: 'flex',
        },
    },
    progress: {
        width: '100px',
        height: '100px',
    },
});

const ItemDetail = () => {
    const { itemKey, isDetailOpen, setDetailOpen } = useContext(ItemContext);
    const classes = useStyles();
    const [detailData, setDetailData] = useState(null);
    const handleClose = () => setDetailOpen(false);
    const loading = useFetch(setDetailData, URL.DEV.DETAIL + itemKey);

    return (
        <Dialog maxWidth='none' className={classes.dialogWrap} open={isDetailOpen} onClose={handleClose}>
            <DialogContent className={classes.contentWrap}>
                {
                    loading ?
                        <div className='detail-progress-wrap'>
                            <CircularProgress size='none' color='secondary' className={classes.progress} />
                        </div> :
                        <div className='detail-data-wrap'>
                            <DetailImage {...{ detailData }} />
                            <DetailInfo {...{ detailData }} />
                        </div>
                }
            </DialogContent>
            <DialogActions>
                <div className='detail-closeBtn'>
                    <CloseRoundedIcon onClick={handleClose} />
                </div>
            </DialogActions>
        </Dialog>
    )
}

export default ItemDetail
