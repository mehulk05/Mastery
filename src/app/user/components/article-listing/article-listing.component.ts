import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '@app/shared/services/crud.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-article-listing',
  templateUrl: './article-listing.component.html',
  styleUrls: ['./article-listing.component.css']
})
export class ArticleListingComponent implements OnInit {
  
  isFilter = false
  searchText
  articleList = []
  config: any;
  articleListByDate: any
  selectedDate: any;
  constructor(private crudService: CrudService, private router: Router) {
    this.config = {
      itemsPerPage: 3,
      currentPage: 1,
      totalItems: this.articleList.length
    };
  }

  ngOnInit(): void {
    this.loadArticles()
  }


  async loadArticles() {
    this.crudService.startLoader()
    this.crudService.getAll("article").subscribe(async data => {
      this.articleList = await data.map(e => {
        let desc
        desc = this.extractContent(e.payload.doc.data()['body'])
        let imgUrl = e.payload.doc.data()['imgUrl'] ? e.payload.doc.data()['imgUrl'] : 'https://neilpatel.com/wp-content/uploads/2017/08/blog.jpg'

        return {
          key: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          body: e.payload.doc.data()['body'],
          category: e.payload.doc.data()['category'],
          date: e.payload.doc.data()['date'],
          shortDesc: desc,
          imgUrl: imgUrl,
          author: e.payload.doc.data()['author'],
          isPublic: e.payload.doc.data()["isPublic"]
        };
      })
      this.articleList = this.articleList.filter(data => {
        return data.isPublic == true
      })

      let grouped_items = _.groupBy(this.articleList, (b: any) =>
        moment(b.date.toDate()).startOf('month').format('YYYY/MM'));

      _.values(grouped_items)
        .forEach(arr => arr.sort((a, b) => moment(a.date).day() - moment(b.date).day()));

      this.articleListByDate = grouped_items
      this.crudService.stopLoader()
    }, e => {
      this.crudService.stopLoader()
    });
  }

  formarArticleBody(articles) {
    let updatedArticleList = []
    let publicArticles = []
    let desc
    articles.forEach(article => {
      desc = this.extractContent(article.body)
      article.shortDesc = desc
      article.imgUrl = article.imgUrl ? article.imgUrl : 'https://neilpatel.com/wp-content/uploads/2017/08/blog.jpg'
      article.isPublic = article.isPublic ? article.isPublic : false
      if (article.isPublic) {
        publicArticles.push(article)
      }

      updatedArticleList.push(article)
    });

    return publicArticles
  }

  getArticleByDate(item, date) {

    this.selectedDate = date
    this.isFilter = true
    this.articleList = item.value
    let data = this.articleList.filter(data => {
      return moment(data.date.toDate()).startOf('month').format('YYYY/MM') == date
    })
  }


  clearFilter() {
    this.loadArticles()
    this.selectedDate = ""
    this.isFilter = false

  }
  extractContent(s) {
    var span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };

  formatData(data) {
    let returnData = []
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        returnData.push({ ...data[key], key });
      }
    }
    return returnData
  }

  editArticle(article) {
    this.router.navigateByUrl("/user/article-detail/" + article.key)
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

}
