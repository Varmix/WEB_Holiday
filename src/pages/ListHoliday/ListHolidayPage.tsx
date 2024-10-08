import HolidayCard from './HolidayCard/HolidayCard.tsx';
import PageWrapper from '../../components/common/PageWrapper.tsx';
import PageContent from '../../components/common/PageContent.tsx';
import { useGetAllHolidayByParticipant, useGetAllHolidayPublished } from '../../api/Queries/HolidayQueries.ts';
import Modal from '../../components/Modal/Modal.tsx';
import { useState } from 'react';
import { useGetInvitations } from '../../api/Queries/InvitationQueries.ts';
import { NavLink } from 'react-router-dom';
import ErrorMessage from '../../components/common/ErrorMessage.tsx';
import Loading from '../../components/common/Loading.tsx';
import HolidayInvitation from './HolidayInvitation/HolidayInvitation.tsx';
import { AxiosError } from 'axios';

const ListHolidayPage = () => {
  const [showModalInvitation, setShowModalInvitation] = useState(false);
  const [isPersonalHoliday, setIsPersonalHoliday] = useState(false);
  const [pageTitle, setPageTitle] = useState('Mes vacances');

  const { data: invitations, isLoading: invitationsIsLoading, error: invitationsError } = useGetInvitations();
  const { data: holidays, isLoading } = isPersonalHoliday
    ? useGetAllHolidayPublished(true)
    : useGetAllHolidayByParticipant(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // GESTION DES ERREURS
  if (invitationsError) {
    const axiosError = invitationsError as AxiosError;
    if (axiosError.response) {
      setErrorMessage(axiosError.response.data as string);
    }
  }

  // GESTION DE LA MONDALE
  const openModalInvitation = (): void => {
    setShowModalInvitation(true);
  };

  const closeModalInvitation = (): void => {
    setShowModalInvitation(false);
  };

  // FILTER DES VACANCES PUBLIEES
  const handleCheckboxChange = () => {
    setIsPersonalHoliday(!isPersonalHoliday);
    if (isPersonalHoliday) {
      setPageTitle('Mes vacances');
    } else {
      setPageTitle('Vacances publiées par les utilisateurs');
    }
  };

  const backgroundClass = showModalInvitation ? 'blur-background' : '';

  return (
    <PageWrapper>
      <PageContent pageTitle={pageTitle}>
        <>
          <div>
            {isLoading ? (
              <p>Chargement en cours...</p>
            ) : (
              <>
                <div className="w-full flex justify-between">
                  <NavLink
                    className="inline-block bg-blue-800 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
                    to="/holidays/holiday"
                  >
                    Encoder
                  </NavLink>
                  <button
                    onClick={openModalInvitation}
                    type="button"
                    className="inline-block bg-blue-800 hover-bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
                  >
                    Invitations
                    <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-sm text-blue-800 font-bold bg-white rounded-full">
                      {invitations.length}
                    </span>
                  </button>
                </div>

                <div className="my-12">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={isPersonalHoliday}
                      onChange={handleCheckboxChange}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-800"></div>
                    <span className="ml-3 text-lg font-medium text-gray-900">
                      Vacances publiées par les utilisateurs
                    </span>
                  </label>
                </div>

                <div className={`grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2 ${backgroundClass}`}>
                  {holidays.map((holiday) => (
                    <HolidayCard key={holiday.id} holiday={holiday} isPersonalHoliday={!isPersonalHoliday} />
                  ))}
                </div>
              </>
            )}
          </div>
          {showModalInvitation && (
            <Modal show={showModalInvitation} onClose={closeModalInvitation} title={'Invitations'}>
              {invitationsError ? (
                <ErrorMessage message={errorMessage} />
              ) : (
                <>
                  {invitationsIsLoading ? (
                    <Loading />
                  ) : (
                    <>
                      {invitations.length === 0 ? (
                        <p>Aucune invitation disponible.</p>
                      ) : (
                        <ul className="my-4 space-y-3 overflow-y-scroll h-52 pr-4">
                          {invitations?.map((invitation) => (
                            <HolidayInvitation key={invitation.id} invitation={invitation} />
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </>
              )}
            </Modal>
          )}
        </>
      </PageContent>
    </PageWrapper>
  );
};

export default ListHolidayPage;
