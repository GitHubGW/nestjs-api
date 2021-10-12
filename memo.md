## NestJS API

#### http://localhost:3000

- 데코레이터는 하나의 클래스를 하나의 모듈로서 표시한다.

#### movie.entity.ts

- 데이터베이스가 존재한다면 그 데이터베이스에 존재하는 모델에 대한 타입을 정의해주기 위한 클래스를 가지고 있는 파일이다.

#### Dto

- Dto는 우리가 받을 데이터가 어떤 종류의 데이터이고 어떤 타입을 가진 데이터인지 정의해주기 위한 클래스이다.

#### create-movie.dto.ts

- movie.controller.ts와 movie.service.ts에 movieData에 대한 타입을 정의해주기 위한 클래스를 가지고 있는 파일이다.

#### update-movie.dto

- movie.controller.ts와 movie.service.ts에 updateData에 대한 타입을 정의해주기 위한 클래스를 가지고 있는 파일이다.
- extends를 사용해서 다른 dto를 가져와서 확장해서 사용할 수 있다. 
- PartialType는 가져온 dto의 데이터 필드들이 필수가 아닌 선택적이게 변경한다.

#### Pipes

- 파이프는 요청하는 쿼리에 대한 타입과 유효성을 검사해주는 일종의 validator(유효성 검사기)이다.
- NestApplication인 app에 useGlobalPipes메서드를 사용해서 사용할 파이프를 지정해준다.
- new ValidationPipe()을 통해 ValidationPipe를 생성하고 여러 설정들을 해준다.
- whitelist는 지정한 필드가 아닌 없는 필드를 request했을 때 없는 필드를 제외하고 request한다.
- forbidNonWhitelisted은 지정한 필드가 아닌 없는 필드를 request했을 때 HTTP 오류를 띄운다.
- transform은 사용자가 지정한 데이터 타입으로 자동으로 변환시켜서 전달해준다. (문자->숫자)
  
```javascript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

#### Dependency Injection

- movie.service.ts같이 Service파일은 @Injectable() 데코레이터를 사용한다.
- 이 movie.service를 movie.module처럼 module파일 안의 provider에 inject(주입)해주게 되면 파일 가장 상단에 import를 통해 movie.service를 가져오지 않아도 movie.service가 가지고 있는 메서드들을 가져와서 사용할 수 있게 된다.
- @Injectable() 데코레이터는 클래스를 프로바이더로 표시하는 데코레이터이며, 생성자 매개변수를 통해 다른 클래스에 주입할 수 있다.