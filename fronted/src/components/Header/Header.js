import './header.css';
import 'primeicons/primeicons.css';
import logo from '../../assets/ÍCONESEMFUNDO-01.png';

function Header() {
    return (
        <div className='header'> 
            <img src={logo} alt="Logo da Loja KX" className="logo"/>
            <span className='texto'> Loja KX</span>
        </div>
    );
}

export default Header;
