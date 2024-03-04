import { Button } from '@/components/ui/button';

// 1. izvaditi sve boje iz figme u tailwind config
// 2. namestiti font-family
// 3. namestiti sve variants button-a
// * kada namestim config i button as example
// 1. MongoDB --- nov projekat
// 2. mongoose --- namestiti povezati
// 3. Next-auth --- email pw, google, github
// 4. Login page --- sign-up i sign-in ( prvo uraditi sa github-om pa google)

// * branch
// feature/tailwind-styles
// feat / tailwind - styling;
// feat / authentication;

// app/(auth)/login/page.tsx implement RHF + ZOD ili Yup
// REGIISTE
const Home: React.FC = () => {
  const handlSubmit = async () => {
    // connect to mongo
    // provera da li user vec postoji
    // ako ne postoji onda create user
    // ako postoji baca se/ prikazuje error
    // ZA REGISTER
    // 1. kada unese podatke da ga redirect na /login ---> proces dalje
    // 2. drugi slucaj da sam posle registera opet signIn func za login i tako se pravi session
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#10121E',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <div className="w-[400px] ">Home Page</div>
      {/* <h2 className="h2-bold">this is some text</h2>
      <p className="p1-medium">Paragraph 1 Medium</p> */}
    </div>
  );
};

export default Home;
