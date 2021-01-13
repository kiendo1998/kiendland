import './news.scss';

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row, Table} from 'reactstrap';
import {
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount
} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities} from '../../entities/propertyservice/news/news.reducer';
import {INews} from 'app/shared/model/propertyservice/news.model';
import {APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT} from 'app/config/constants';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {overridePaginationStateWithQueryParams} from 'app/shared/util/entity-utils';


export interface INewsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export const News = (props: INewsProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const {newsList, match, loading, totalItems} = props;
  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <h4 className="section-heading">Tin tức</h4>
        </div>
        {newsList && newsList.length > 0 ? (
          <div className="row">
            {newsList.map((news, i) => (
              <div key={`entity-${i}`} className="col-sm-4">
                <div className="card horizontal">
                  <div>
                    <div className="card-content">
                      <div className="card-image blog-content-image">
                        <img src={require('../../../content/images/slide3.jpg').default}/>
                      </div>
                      <span className="card-title">
                        <a href={`${match.url}/../../news/${news.id}`}>{news.title}</a>
                      </span>
                      {news.content.substring(0, 120)}
                    </div>
                    <div className="card-action blog-action clearfix">
                      <a href="{{ route('blog.author',$post->user->username) }}" className="btn-flat">
                        <i className="material-icons">person</i>
                        <span>Admin</span>
                      </a>
                      <a href="#" className="btn-flat disabled">
                        <i className="material-icons">watch_later</i>
                        <span>{news.publishDate}</span>
                      </a>
                      <a href="{{ route('blog.categories',$category->slug) }}" className="btn-flat">
                        <i className="material-icons">folder</i>
                        <span>list category</span>
                      </a>
                      <a href="{{ route('blog.tags',$tag->slug) }}" className="btn-flat">
                        <i className="material-icons">label</i>
                        <span>list tag</span>
                      </a>

                      <a href="{{ route('blog.show',$post->slug) . '#comments' }}" className="btn-flat">
                        <i className="material-icons">comment</i>
                        <span>5</span>
                      </a>
                      <a href="#" className="btn-flat disabled">
                        <i className="material-icons">visibility</i>
                        <span>5</span>
                      </a>
                    </div>
                  </div>
                </div>


                <div className="m-t-30 m-b-60 center">
                  ngày tháng
                </div>

              </div>
            ))}
            <div className="col s12 m4">

              <div className="card">
                <div className="card-content">
                  <h3 className="font-18 m-t-0 bold uppercase">Nhiều người đọc</h3>
                  <ul className="collection">
                    <li className="collection-item">
                      <a href="{{ route('blog.show',$post->slug) }}" className="indigo-text text-darken-4">
                      <span className="truncate tooltipped" data-position="bottom"
                            data-tooltip="{{ $post->title }}">Dự án mới ở phú lễ</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-content">
                  <h3 className="font-18 m-t-0 bold uppercase">Danh mục</h3>
                  <ul>
                    <li className="category-bg-image"
                        style={{'backgroundImage': `#`}}>

                      <a href="{{ route('blog.categories',$category->slug) }}">

                        <span className="left">dự án mới</span>

                        <span className="right">5</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-content">
                  <h3 className="font-18 m-t-0 bold uppercase">Dòng thời gian</h3>
                  <ul className="collection">
                    <li className="collection-item">

                      <a href="/blog/?month={{ $stats['month'] }}&year={{ $stats['year'] }}"
                         className="indigo-text text-darken-4">

                        tháng 12/2020

                        <span className="badge indigo darken-1 white-text">hello</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <div className="card-content">
                  <h3 className="font-18 m-t-0 bold uppercase">Tag</h3>
                  <a href="{{ route('blog.tags',$tag->slug) }}">
                    <span className="btn-small indigo white-text m-b-5 card-no-shadow">tagname</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        ) : (
          !loading && <div className="alert alert-warning">không có tin tức nào</div>
        )}
      </div>
    </section>
  );
};

const mapStateToProps = ({news}: IRootState) => ({
  newsList: news.entities,
  loading: news.loading,
  totalItems: news.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(News);
// export const News = (props: INewsProp) => {
//   const { message } = props;
//
//   return (
//     <section className="section">
//       <div className="container">
//         <div className="row">
//           <h4 className="section-heading">Tin tức</h4>
//         </div>
//         <div className="row">
//
//           <div className="col s12 m8">
//             <div className="card horizontal">
//               <div>
//                 <div className="card-content">
//                   <div className="card-image blog-content-image">
//                   {/*  image*/}
//                   </div>
//                   <span className="card-title">
//                                         <a href="{{ route('blog.show',$post->slug) }}">title</a>
//                                     </span>
//                 </div>
//                 <div className="card-action blog-action clearfix">
//                   <a href="{{ route('blog.author',$post->user->username) }}" className="btn-flat">
//                     <i className="material-icons">person</i>
//                     <span>người đăng</span>
//                   </a>
//                   <a href="#" className="btn-flat disabled">
//                     <i className="material-icons">watch_later</i>
//                     <span>thời gian đăng</span>
//                   </a>
//                   <a href="{{ route('blog.categories',$category->slug) }}" className="btn-flat">
//                     <i className="material-icons">folder</i>
//                     <span>list category</span>
//                   </a>
//                   <a href="{{ route('blog.tags',$tag->slug) }}" className="btn-flat">
//                     <i className="material-icons">label</i>
//                     <span>list tag</span>
//                   </a>
//
//                   <a href="{{ route('blog.show',$post->slug) . '#comments' }}" className="btn-flat">
//                     <i className="material-icons">comment</i>
//                     <span>5</span>
//                   </a>
//                   <a href="#" className="btn-flat disabled">
//                     <i className="material-icons">visibility</i>
//                     <span>5</span>
//                   </a>
//                 </div>
//               </div>
//             </div>
//
//
//             <div className="m-t-30 m-b-60 center">
//               ngày tháng
//             </div>
//
//           </div>
//
//           <div className="col s12 m4">
//
//             <div className="card">
//               <div className="card-content">
//                 <h3 className="font-18 m-t-0 bold uppercase">Nhiều người đọc</h3>
//                 <ul className="collection">
//                   <li className="collection-item">
//                     <a href="{{ route('blog.show',$post->slug) }}" className="indigo-text text-darken-4">
//                       <span className="truncate tooltipped" data-position="bottom"
//                             data-tooltip="{{ $post->title }}">Dự án mới ở phú lễ</span>
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//
//             <div className="card">
//               <div className="card-content">
//                 <h3 className="font-18 m-t-0 bold uppercase">Danh mục</h3>
//                 <ul>
//                   <li className="category-bg-image"
//                       style={{'backgroundImage': `#`}}>
//
//                     <a href="{{ route('blog.categories',$category->slug) }}">
//
//                       <span className="left">dự án mới</span>
//
//                       <span className="right">5</span>
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//
//             <div className="card">
//               <div className="card-content">
//                 <h3 className="font-18 m-t-0 bold uppercase">Dòng thời gian</h3>
//                 <ul className="collection">
//                   <li className="collection-item">
//
//                     <a href="/blog/?month={{ $stats['month'] }}&year={{ $stats['year'] }}"
//                        className="indigo-text text-darken-4">
//
//                       tháng 12/2020
//
//                       <span className="badge indigo darken-1 white-text">hello</span>
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//
//             <div className="card">
//               <div className="card-content">
//                 <h3 className="font-18 m-t-0 bold uppercase">Tag</h3>
//                 <a href="{{ route('blog.tags',$tag->slug) }}">
//                   <span className="btn-small indigo white-text m-b-5 card-no-shadow">tagname</span>
//                 </a>
//               </div>
//             </div>
//
//           </div>
//
//         </div>
//       </div>
//     </section>
//   )
// }
//
// const mapStateToProps = storeState => ({
//   message: storeState.message
// });
//
// type StateProps = ReturnType<typeof mapStateToProps>;
//
// export default connect(mapStateToProps)(News);
