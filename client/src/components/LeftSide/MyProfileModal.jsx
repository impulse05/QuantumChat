import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { Button, Modal } from 'flowbite-react';
import { getCurrentUser } from '../api/auth';

export default function MyProfileModal({show,setShow, ...props}) {
    const user = getCurrentUser();
    return (
        <Modal show={show} className="py-5 h-100 w-100 bg-black">
            <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol lg="10" className="mb-1 mb-lg-1">
                    <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                        <MDBRow className="g-0">
                            <MDBCol md="4" className="gradient-custom justify-center text-center text-black"
                                style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                <MDBCardImage  src={user.picture || "https://mdbootstrap.com/img/new/avatars/2.jpg"}
                                    alt="Avatar"  style={{ width: '80px' ,borderRadius:"40px"}} fluid />
                            </MDBCol>
                            <MDBCol md="8">
                                <MDBCardBody className="p-4">
                                    <MDBTypography >{user.name}</MDBTypography>
                                    {/* <hr className="mt-0 mb-4" /> */}
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <MDBCol md="12">
                <MDBCardBody className="p-10">
                    <MDBTypography tag="h9">{user.name}</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                        <MDBCol size="10" className="mb-2">
                            <MDBTypography tag="h6">Email</MDBTypography>
                            <MDBCardText className="text-muted">{user.email}</MDBCardText>
                        </MDBCol>
                        {user.phone && <MDBCol size="10" className="mb-2">
                            <MDBTypography tag="h6">Phone</MDBTypography>
                            <MDBCardText className="text-muted">{user.phone}</MDBCardText>
                        </MDBCol>}
                    </MDBRow>
                </MDBCardBody>
            </MDBCol>
            <Button onClick={()=>{setShow(false)}}>Close</Button>
        </Modal>
    );
}