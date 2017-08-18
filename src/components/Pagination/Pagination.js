import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react';

class Pagination extends Component {

  getNbPages() {
    return Math.ceil(this.props.total / this.props.perPage) || 1;
  }

  range() {
    const input = [];
    const { page, perPage, total } = this.props;
    if (isNaN(page)) return input;
    const nbPages = Math.ceil(total / perPage) || 1;

    // display page links around the current page
    if (page > 2) {
      input.push('1');
    }
    if (page === 4) {
      input.push('2');
    }
    if (page > 4) {
      input.push('.');
    }
    if (page > 1) {
      input.push(page - 1);
    }
    input.push(page);
    if (page < nbPages) {
      input.push(page + 1);
    }
    if (page === (nbPages - 3)) {
      input.push(nbPages - 1);
    }
    if (page < (nbPages - 3)) {
      input.push('.');
    }
    if (page < (nbPages - 1)) {
      input.push(nbPages);
    }

    return input;
  }

  prevPage = (event) => {
    event.stopPropagation();
    if (this.props.page === 1) {
      throw new Error('navigation.page_out_from_begin');
    }
    this.props.setPage(this.props.page - 1);
  }

  nextPage = (event) => {
    event.stopPropagation();
    if (this.props.page > this.getNbPages()) {
      throw new Error('navigation.page_out_from_end');
    }
    this.props.setPage(this.props.page + 1);
  }

  gotoPage = (event) => {
    event.stopPropagation();
    const page = event.currentTarget.dataset.page;
    if (page < 1 || page > this.getNbPages()) {
      throw new Error('navigation.page_out_of_boundaries');
    }
    this.props.setPage(page);
  }

  renderPageNums() {
    return this.range().map(pageNum =>
      (
        (pageNum === '.') ?
          <Menu.Item key={`hyphen_${pageNum}`} disabled>...</Menu.Item> :
          <Menu.Item
            key={pageNum}
            onClick={this.gotoPage}
            active={pageNum === this.props.page}
          >
            {pageNum}
          </Menu.Item>
      ),
    );
  }

  render() {
    const { page, total } = this.props;
    if (total === 0) return null;
    const nbPages = this.getNbPages();

    if (nbPages <= 1) {
      return <div />;
    }

    return (
      <Menu size="mini" pagination>
        {page > 1 &&

          <Menu.Item name="angle left" key="prev" onClick={this.prevPage}>
            <Icon name="angle left" />
            Previous
          </Menu.Item>
        }
        {this.renderPageNums()}
        {page !== nbPages &&
          <Menu.Item name="angle right" key="next" onClick={this.nextPage}>
            Next
            <Icon name="angle right" />
          </Menu.Item>
        }
      </Menu>
    );
  }
}

Pagination.propTypes = {
  page: PropTypes.number,
  perPage: PropTypes.number,
  total: PropTypes.number,
  setPage: PropTypes.func,
};

Pagination.defaultProps = {
  page: 0,
  perPage: 12,
  total: 0,
  setPage: null,
};

export default Pagination;
