import {
  Stack, Card, CardContent, Box, Typography, Tooltip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import uniqid from 'uniqid';

import zeroImage from 'assets/images/zero.png';
import Loader from 'components/Loader/Loader';
import { transactionSortingByDate } from 'helpers/transactionSorting';
import { transactionRefactor } from 'helpers/transactionRefactor';
import columns from 'components/DashTable/DashTable'

const MobileDashTable = () => {

  const { transactions, status, categories } = useSelector((state) => state.transactions);
  const sortedTransactions = transactionSortingByDate(transactions);
  const editedTransactions = sortedTransactions.map(transaction => transactionRefactor(transaction, categories));

  const noTransaction = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Sorry, now you don't have any transaction(</h1>
        <img src={zeroImage} alt={'noTransactions'} style={{ width: '60vh' }} />
      </div>
    );
  };

  return (
    <>
      {
        status === 'loading' ? <Loader left={'45%'} top={'500%'} zIndex={5} /> :
          status === 'resolved' && transactions.length > 0 ? (
            <Stack direction={'column'} sx={{ pb: '25px' }}>
              {
                editedTransactions.map(transaction => (
                  <Card key={uniqid()} style={{
                    borderRadius: '10px',
                    borderLeftWidth: '5px',
                    borderLeftStyle: 'solid',
                    borderLeftColor: transaction.type === '+' ? '#24CCA7' : '#FF6596',
                  }} sx={{
                    '&:not(:last-of-type)': {
                      marginBottom: '10px',
                    },
                    '& .MuiCardContent-root:last-child': {
                      pb: 0,
                    },
                  }}>
                    <CardContent sx={{ padding: 0 }}>
                      {
                        columns.map(column => (
                          <Box key={uniqid()} sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            borderBottom: '1px solid #DCDCDF',
                            height: '47px',
                            alignItems: 'center',
                            paddingX: '20px',
                          }}>
                            <Typography key={uniqid()}>
                              {column.id}
                            </Typography>
                            {
                              transaction[column.id].length >= 30 ? (
                                <Tooltip key={uniqid()}
                                         title={transaction[column.id]}>
                                  <Typography key={uniqid()} sx={{
                                    maxWidth: '49%',
                                    width: '50%',
                                    display: 'block',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                  }}>
                                    {transaction[column.id]}
                                  </Typography>
                                </Tooltip>
                              ) : (
                                <Typography key={uniqid()}
                                            sx={{ maxWidth: '200px' }}>
                                  {transaction[column.id]}
                                </Typography>
                              )
                            }
                          </Box>))
                      }
                    </CardContent>
                  </Card>))
              }
            </Stack>) : status === 'resolved' ? noTransaction() : null
      }
    </>
  );
};

export default MobileDashTable;