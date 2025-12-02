import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GaleriaService {
  private imagens = [
    'https://i.postimg.cc/jL7g1jdb/pousada1.jpg',
    'https://i.postimg.cc/xk4LYKtF/pousada2.jpg',
    'https://i.postimg.cc/1gCfwsFg/pousada3.jpg',
    'https://3.bp.blogspot.com/-49EX5hP-zos/XFmtupKFl9I/AAAAAAAAujQ/m_CaNvOS0AslhFUubuvApHqgcmH8LUFdQCLcBGAs/s1600/Chal%C3%A9%2BPr%C3%A9-Fabricado%2B6.jpg',
    'https://i.postimg.cc/wRDX0CqX/quarto-padrao-extra.jpg',
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/e7/d6/8f/terracos-choparia.jpg?w=1200&h=-1&s=1',
    'https://th.bing.com/th/id/OIP.xQep1xW8qHE-oWVDXCayewHaEE?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.cdjmqIiriFu1vg0793BN9AHaE7?rs=1&pid=ImgDetMain',
    'https://th.bing.com/th/id/OIP.i_2GnvEAzVdgJ_DLzQyPTQHaE8?rs=1&pid=ImgDetMain'
  ];

  listar(): string[] {
    return [...this.imagens];
  }
}