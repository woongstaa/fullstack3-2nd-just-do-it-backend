# Just Do It

- 세계적인 스포츠 용품 브랜드 [나이키](https://www.nike.com/kr/ko_kr/)의 여러 기능들을 단순한 클론 코딩이 아닌 스스로 구현해 보는 것을 목표로 진행한 프로젝트입니다.
- 나이키 공식 홈페이지에서 결제, 주문을 제외한 대부분의 기능을 모두 구현했습니다.
- 개발기간: 2022.01.17. ~ 2022.01.28.

## 🧑🏻‍💻 Members

### 🖥 Front-end

- 이진웅
- 황희윤

###  ⌨️ Back-end

- 이준혁
- 김영욱

## 레포지토리 주소

- [프론트엔드 깃허브](https://github.com/wecode-bootcamp-korea/fullstack3-2nd-just-do-it-frontend)
- [백엔드 깃허브](https://github.com/wecode-bootcamp-korea/fullstack3-2nd-just-do-it-backend)

## 사용한 기술 스택

### Common

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">

### Front-end

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">

### Back-end

<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

## 구현 기능

- 이진웅
  - 메인페이지 UI
  - Top, Nav, Footer UI
    - Drop-down 스타일의 Nav UI
  - 회원가입, 로그인  UI
    - 카카오 로그인 API 활용, SNS 로그인 기능
    - 모달창을 활용한 로그인 UI
  - 리스트 페이지 UI
    - Flex, Grid를 활용한 레이아웃 구성
    - 쿼리파라미터를 활용한 필터링/정렬 기능
  - SNKRS 페이지 UI
    - Flex, Grid를 활용한 레이아웃 구성
  - SNKRS 디테일 페이지 UI
    - 백엔드와의 통신을 통한 추첨 기능

- 황희윤

- 이준혁

- 김영욱


## 동영상 링크 및 결과물 스크린샷

[동영상 링크]()

### DB 모델링
![image (4)](https://user-images.githubusercontent.com/92710433/152798945-7d14b79f-a1c9-4f3b-a50e-84e6a5ba6376.png)

### 메인 페이지
<img width="1439" alt="스크린샷 2022-02-07 오후 1 55 04" src="https://user-images.githubusercontent.com/87569550/152726717-08c45ae0-7b35-4dfe-b561-39c25bd377e4.png">

### 헤더 
<img width="1437" alt="스크린샷 2022-02-07 오후 1 55 18" src="https://user-images.githubusercontent.com/87569550/152726739-76347291-686c-4d6c-92d1-cb541c265fb2.png">

### 상품 목록(리스트) 페이지

- 상품 목록 페이지에서 사용자가 자신의 선호에 맞게 색깔, 상품 브랜드, 사이즈에 맞게 필터링해서 상품 목록을 볼 수 있습니다.

<img width="1439" alt="스크린샷 2022-02-07 오후 1 58 38" src="https://user-images.githubusercontent.com/87569550/152727146-93ada256-11c0-4f39-8655-7b85212244ba.png">

- 신상품순, 가격 높은 순, 낮은 순, 할인율 순 등등 상품 목록을 사용자가 원하는대로 정렬시킬 수도 있습니다.

<img width="1440" alt="스크린샷 2022-02-07 오후 2 00 09" src="https://user-images.githubusercontent.com/87569550/152738304-2777c204-9918-4eba-af2d-35e19b0f0ce7.png">

### 상품 상세(디테일) 페이지

- 리뷰(별점) 기능도 만들어서 사용자가 해당 상품에 대한 평가를 주고 볼 수 있습니다.

<img width="1439" alt="스크린샷 2022-02-07 오후 3 47 16" src="https://user-images.githubusercontent.com/87569550/152738779-e8d3874a-0b9d-4ed1-8804-3e0f3c98bad5.png">

- 장바구니 기능을 오른쪽에 모달창으로 구현해서, 거기서 장바구니에 담긴 상품들 리스트를 볼 수 있고, 상품들을 삭제할 수 있습니다.

<img width="1440" alt="스크린샷 2022-02-07 오후 3 49 33" src="https://user-images.githubusercontent.com/87569550/152738975-c2c01e90-0f51-4388-8895-ed05caaaa51a.png">


### 회원가입 & 로그인

- 회원가입은 기존에 사용자 정보를 사용자가 직접 입력하는 방식이 아니라 소셜 로그인으로 카카오톡 계정을 통해서 회원가입을 하는 방식을 만들었습니다.

<img width="1440" alt="스크린샷 2022-02-07 오후 3 52 46" src="https://user-images.githubusercontent.com/87569550/152739599-9234215b-ee68-4952-9b0c-4169485bf2e0.png">

- 로그인은 헤더 상단의 로그인 버튼을 누르면 어느 페이지든 모달창으로 나와서 사용가능하도록 만들었습니다.

<img width="1438" alt="스크린샷 2022-02-07 오후 3 53 14" src="https://user-images.githubusercontent.com/87569550/152740878-a4c3f1d4-ba34-4658-a170-9afd31ebeed3.png">

### 스니커즈 상품 목록(리스트) 페이지

- 스니커즈는 나이키에서 추첨으로 랜덤한 사용자를 뽑아서 뽑힌 사람들에게만 구매 권한을 주는 상품입니다.

<img width="1439" alt="스크린샷 2022-02-07 오후 4 11 04" src="https://user-images.githubusercontent.com/87569550/152748153-a052e29a-4c60-4d74-9166-0c6c46d4e99a.png">

### 스니커즈 상품 상세(디테일) 페이지

- 스니커즈는 특정한 시간에 사람들이 약 30분간 추첨을 하고, 이 후 시간이 지나면 추첨이 끝나면서 당첨을 확인할 수 있는 페이지입니다.

<img width="1440" alt="스크린샷 2022-02-07 오후 4 11 18" src="https://user-images.githubusercontent.com/87569550/152749238-6bd1a833-603b-44f2-b215-256545758d9d.png">




