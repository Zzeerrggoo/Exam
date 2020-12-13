import React from 'react';
import {Pagination} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
  customPagination: {
    alignSelf: 'stretch',
    paddingTop: '3rem',
    paddingBottom: '5rem',
    '& .MuiPagination-ul': {
      justifyContent: 'center',
    },
    '& .MuiPaginationItem-sizeLarge': {
      fontSize: '1.5rem',
    },
    '@media (max-width: 960px)': {
      '& .MuiPaginationItem-sizeLarge': {
        fontSize: '1rem',
      },
      '& .MuiPagination-ul li': {
        width: '2rem',
      },
    },
  },
});

const MaterialUiPagination = (props) => {

  const {pagesNumber, siblingCount, onPageChange} = props;
  const classes = useStyles();

  const handleChange = (target, page) => {
    onPageChange(page);
  };

  return (<Pagination count={pagesNumber ?? 0}
                      siblingCount={siblingCount ?? 2}
                      shape="rounded"
                      size="large"
                      classes={{root: classes.customPagination}}
                      onChange={handleChange}
                      getItemAriaLabel={(data) => data}
  />);
};

export default MaterialUiPagination;