import Sidebar from "./Sidebar"
import Link from 'next/link';
import adminLogin from 'services/adminLogin'
import { useRouter } from 'next/router'


const AdminLayout = ({children}) => {
    const router = useRouter()

    if(!adminLogin() && typeof window !== "undefined") router.push('/admin/login')
  return ( 
    <body className="sb-nav-fixed"> 
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <Link href="/admin">
                <a className="navbar-brand ps-3" >We are One</a>
            </Link>          
            
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" ><i className="fas fa-bars"></i></button>
            
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                </div>
            </form>
            
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#!">Settings</a></li>
                        <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#!">Logout</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <Link href="/admin">
                                <a className="nav-link">
                                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                    Dashboard
                                </a>
                            </Link>
                            <div className="sb-sidenav-menu-heading">PRODUCTS</div>
                            <a className="nav-link collpse-menu collapsed" href="#" aria-expanded="false" aria-haspopup="true" data-toggle="collapse" aria-controls="collapseLayouts" data-target="#collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                Books
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link href='/admin/books/allBooks'>
                                        <a className='nav-link'>All Books</a>
                                    </Link>
                                    <Link href='/admin/books/addBook'>
                                        <a className='nav-link'>Add Book</a>
                                    </Link>
                                </nav>
                            </div>

                            <a className="nav-link collpse-menu collapsed" href="#" aria-expanded="false" aria-haspopup="true" data-toggle="collapse" aria-controls="collapseLayouts" data-target="#collapseLayouts2">
                                <div className="sb-nav-link-icon"><i className="fas fa-caret-square-up"></i></div>
                                Cards
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseLayouts2" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                  
                                <Link href='/admin/cards/allCards'>
                                      <a className='nav-link'>All Cards</a>
                                  </Link>
                                  <Link href='/admin/cards/addCard'>
                                      <a className='nav-link'>Add Card</a>
                                  </Link>
                                  
                                </nav>
                            </div>

                            <a className="nav-link collpse-menu collapsed" href="#" aria-expanded="false" aria-haspopup="true" data-toggle="collapse" aria-controls="collapseLayouts" data-target="#collapseLayouts3">
                                <div className="sb-nav-link-icon"><i className="fas fa-puzzle-piece"></i></div>
                                Puzzles
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseLayouts3" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link href='/admin/puzzles/addPuzzle'>
                                        <a className='nav-link'>Add Puzzle</a>
                                    </Link>
                                </nav>
                            </div>

                            <a className="nav-link collpse-menu collapsed" href="#" aria-expanded="false" aria-haspopup="true" data-toggle="collapse" aria-controls="collapseLayouts" data-target="#collapseLayouts5">
                                <div className="sb-nav-link-icon"><i className="fas fa-palette"></i></div>
                                ArtPrints 
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseLayouts5" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link href='/admin/artprints/allArtprints'>
                                        <a className='nav-link'>All ArtPrints</a>
                                    </Link>
                                    <Link href='/admin/artprints/addArtprint'>
                                        <a className='nav-link'>Add ArtPrint</a>
                                    </Link>
                                    
                                </nav>
                            </div>

                            <a className="nav-link collpse-menu collapsed" href="#" aria-expanded="false" aria-haspopup="true" data-toggle="collapse" aria-controls="collapseLayouts" data-target="#collapseLayouts15">
                                <div className="sb-nav-link-icon"><i className="fas fa-users"></i></div>
                                Contact Entries 
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseLayouts15" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link href='/admin/contacts/allContacts'>
                                        <a className='nav-link'>All Entries</a>
                                    </Link>
                                    
                                </nav>
                            </div>

                            <div className="sb-sidenav-menu-heading">CONTENT</div>
                           

                            <a className="nav-link collpse-menu collapsed" href="#" aria-expanded="false" aria-haspopup="true" data-toggle="collapse" aria-controls="collapseLayouts" data-target="#collapseLayouts4">
                                <div className="sb-nav-link-icon"><i className="fas fa-pencil-alt"></i></div>
                                Site content
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseLayouts4" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                  
                                    <Link href='/admin/content/addContent'>
                                        <a className='nav-link'>Add Content</a>
                                    </Link>
                                  
                                </nav>
                            </div>






                            <a className="nav-link collpse-menu collapsed" href="#" aria-expanded="false" aria-haspopup="true" data-toggle="collapse" aria-controls="collapseLayouts" data-target="#collapseLayouts7">
                                <div className="sb-nav-link-icon"><i className="fas fa-shipping-fast"></i></div>
                                Wholesale & Distribution 
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseLayouts7" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                  
                                    <Link href='/admin/pagecontent/wholesale'>
                                        <a className='nav-link'>Add Content</a>
                                    </Link>
                                  
                                </nav>
                            </div>


                            <a className="nav-link collpse-menu collapsed" href="#" aria-expanded="false" aria-haspopup="true" data-toggle="collapse" aria-controls="collapseLayouts" data-target="#collapseLayouts8">
                                <div className="sb-nav-link-icon"><i className="fas fa-headset"></i></div>
                                Help & Support
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseLayouts8" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                  
                                    <Link href='/admin/pagecontent/help'>
                                        <a className='nav-link'>Add Content</a>
                                    </Link>
                                  
                                </nav>
                            </div>


                            <a className="nav-link collpse-menu collapsed" href="#" aria-expanded="false" aria-haspopup="true" data-toggle="collapse" aria-controls="collapseLayouts" data-target="#collapseLayouts9">
                                <div className="sb-nav-link-icon"><i className="fas fa-user-secret"></i></div>
                                Privacy Policy
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseLayouts9" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">                                
                                    <Link href='/admin/pagecontent/privacyPolicy'>
                                        <a className='nav-link'>Add Content</a>
                                    </Link>                               
                                </nav>
                            </div>


                            <a className="nav-link collpse-menu collapsed" href="#" aria-expanded="false" aria-haspopup="true" data-toggle="collapse" aria-controls="collapseLayouts" data-target="#collapseLayouts10">
                                <div className="sb-nav-link-icon"><i className="far fa-sticky-note"></i></div>
                                Terms & Conditions
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseLayouts10" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">                                
                                    <Link href='/admin/pagecontent/termsAndConditions'>
                                        <a className='nav-link'>Add Content</a>
                                    </Link>                              
                                </nav>
                            </div>


                            <a className="nav-link collpse-menu collapsed" href="#" aria-expanded="false" aria-haspopup="true" data-toggle="collapse" aria-controls="collapseLayouts" data-target="#collapseLayouts11">
                                <div className="sb-nav-link-icon"><i className="fas fa-shipping-fast"></i></div>
                                Shipping
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a>
                            <div className="collapse" id="collapseLayouts11" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">                                 
                                    <Link href='/admin/pagecontent/shipping'>
                                        <a className='nav-link'>Add Content</a>
                                    </Link>                                
                                </nav>
                            </div>

                                <nav className="sb-sidenav-menu-nested nav">                                 
                                    <Link href='/admin/logout'>
                                        <a className='nav-link'>Logout</a>
                                    </Link>                                
                                </nav>

                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        testUser
                    </div>
                </nav>
            </div>
            <div id="layoutSidenav_content">
              <main className="px-5 py-4">
                {children}
                </main>
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; We are One 2021</div>
                            <div>
                                <a className="text-muted" href="#">Privacy Policy </a>
                                | 
                                <a className="text-muted" href="#"> Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    </body>
  )
} 

export default AdminLayout