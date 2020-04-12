import { Component, OnInit, Input } from '@angular/core';
import { ArticleViewModel } from '../viewModels/article.viewModel';
import { ArticleMock } from './mocks/article.mock';
import { LoaderService } from '../services/layout/loader.service';
import { CommonService } from '../services/layout/common.service';
import { MenuService } from '../services/layout/menu.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() article: ArticleMock;
  allArticles: any[];
  comments: any[];
  isLoading: boolean;
  id: number;

  public articles: ArticleViewModel[];
  public selectedArticle: ArticleViewModel;

  constructor(public loaderService: LoaderService, public commonService: CommonService, public menuService: MenuService, public router: ActivatedRoute, public navigator: Router) {
    this.selectedArticle =
      new ArticleViewModel(1,
        'https://i.picsum.photos/id/237/700/400.jpg',
        'Luã Falcão',
        '28/12/2019',
        'Design Patterns #5: Abstract Factory',
        'Continuando a série sobre padrões de projeto, onde abordamos soluções reutilizáveis e testáveis para problemas frequentes do dia a dia do programador, hoje falaremos sobre o Abstract Factory, um dos cinco padrões criacionais catalogados pela Gang of Four em seu livro Design Patterns: Elements of Reusable Object-Oriented Software.');

    this.articles = [
      new ArticleViewModel(1,
        'https://i.picsum.photos/id/237/700/400.jpg',
        'Luã Falcão',
        '28/12/2019',
        'Design Patterns #4: State',
        'O padrão de projetos State permite que mudemos o comportamento de um objeto baseado na mudança do seu estado, representando cada estado como uma classe, o que reduz a necessidade de usarmos lógica condicional para verificar, por exemplo, o valor do status de um usuário no sistema.'),

      new ArticleViewModel(2,
        'https://i.picsum.photos/id/237/700/400.jpg',
        'Luã Falcão',
        '21/12/2019',
        'Criando componentes no Angular',
        ''),

      new ArticleViewModel(3,
        'https://i.picsum.photos/id/237/700/400.jpg',
        'Luã Falcão',
        '07/11/2019',
        'Autenticação JWT com .NET Core',
        ''),
      new ArticleViewModel(4,
        '',
        'Luã Falcão',
        '07/11/2019',
        'Lorem Ipsum'),
      new ArticleViewModel(5,
        '',
        'Luã Falcão',
        '07/11/2019',
        'Aqui entrará um título qualquer'),
      new ArticleViewModel(6,
        '',
        'Luã Falcão',
        '07/11/2019',
        'Aqui entrará um título qualquer'),
      new ArticleViewModel(7,
        '',
        'Luã Falcão',
        '07/11/2019',
        'Aqui entrará um título qualquer'),
      new ArticleViewModel(8,
        '',
        'Luã Falcão',
        '07/11/2019',
        'Aqui entrará um título qualquer'),
      new ArticleViewModel(9,
        '',
        'Luã Falcão',
        '07/11/2019',
        'Aqui entrará um título qualquer'),
      new ArticleViewModel(10,
        '',
        'Luã Falcão',
        '07/11/2019',
        'Aqui entrará um título qualquer'),
    ];

  }

  ngOnInit() {
    this.commonService.initializePage();
    this.article = new ArticleMock();
    this.comments = [
      {
        name: 'Ellen Galven',
        content: 'Hi! I loved your article! Congratulations!'
      },
      {
        name: 'Cloud Strife',
        content: 'Muito bom! Parabéns pelo artigo! Adorei a leitura!'
      },
      {
        name: 'Princesa Zelda',
        content: 'Oi! Você viu o Link por aí? Ele esqueceu a Ocarina do Tempo comigo!'
      }
    ];

    this.allArticles = [
      {
        image: 'https://i.picsum.photos/id/237/112/63.jpg',
        title: 'Lorem ipsum expecto patronoum arania exumai',
        date: '15/03/2020',
        id: 1
      },
      {
        image: 'https://i.picsum.photos/id/237/112/63.jpg',
        title: 'Lorem ipsum expecto patronoum arania exumai',
        date: '15/03/2020',
        id: 2
      },
      {
        image: 'https://i.picsum.photos/id/237/112/63.jpg',
        title: 'Lorem ipsum expecto patronoum arania exumai',
        date: '18/02/2020',
        id: 3
      },
      {
        image: 'https://i.picsum.photos/id/237/112/63.jpg',
        title: 'Lorem ipsum expecto patronoum arania exumai',
        date: '08/01/2020',
        id: 4
      },
      {
        image: 'https://i.picsum.photos/id/237/112/63.jpg',
        title: 'Lorem ipsum expecto patronoum arania exumai',
        date: '24/12/2019',
        id: 5
      },
      {
        image: 'https://i.picsum.photos/id/237/112/63.jpg',
        title: 'Lorem ipsum expecto patronoum arania exumai',
        date: '24/12/2019',
        id: 6
      },
      {
        image: 'https://i.picsum.photos/id/237/112/63.jpg',
        title: 'Lorem ipsum expecto patronoum arania exumai',
        date: '24/12/2019',
        id: 7
      },
      {
        image: 'https://i.picsum.photos/id/237/112/63.jpg',
        title: 'Lorem ipsum expecto patronoum arania exumai',
        date: '24/12/2019',
        id: 8
      },
      {
        image: 'https://i.picsum.photos/id/237/112/63.jpg',
        title: 'Lorem ipsum expecto patronoum arania exumai',
        date: '24/12/2019',
        id: 9
      }
    ];

    this.menuService.isArticleMenuVisible = false;
    // fazer um GET na API por ID (que vem da URL) para pegar o ID do artigo
    this.router.params.subscribe(params => this.id = params.id);
    console.log(this.id);
    this.commonService.hideLoading();
  }

  scrollToElement(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  }

  onLike(event: any) {
    // chamada da API para atualizar a coluna no BD com o número de likes
    this.article.numberOfLikes = event;
  }

  onComment(event: any) {
    let thiss = this;
    // chamar api pra adicionar um comentário novo na tela
    // chamar api pra fazer get dos comentários e passar para o componente filho
    this.isLoading = this.loaderService.show();

    // trocar pelo then quando a API estiver pronta
    setTimeout(function () {
      thiss.isLoading = thiss.loaderService.hide();
      thiss.comments.unshift(event);
      thiss.article.numberOfComments++;
      document.getElementById('scrollToAllComments').scrollIntoView({ behavior: 'smooth' });
    }, 2000);
  }

  onGetById(id) {
    // chamar API para obter o artigo por id e atribuir ao objeto article 
  }

  open(url: string) {
    window.open(url);
  }

  navigate(url) {
    this.navigator.navigate([url]);
  }
}
