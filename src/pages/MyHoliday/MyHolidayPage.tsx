import PageWrapper from '../../components/common/PageWrapper.tsx';
import PageContent from '../../components/common/PageContent.tsx';
import { useParams } from 'react-router-dom';
import {
  useGetExportHoliday,
  useGetHolidayById, useLeaveHoliday,
  useUpdateHoliday,
} from '../../api/Queries/HolidayQueries.ts';
import dayjs from 'dayjs';
import MyHolidayWeather from './MyHolidayWeather/MyHolidayWeather.tsx';
import MyHolidayListMembers from './MyHolidayMembers/MyHolidayListMembers.tsx';
import MyHolidayActivities from './MyHolidayActivities/MyHolidayActivities.tsx';
import { useState } from 'react';
import Modal from '../../components/Modal/Modal.tsx';
import { useAuth } from '../../provider/AuthProvider.tsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/common/Loading.tsx';

function MyHolidayPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [showModalPublish, setShowModalPublish] = useState(false);
  const [showModalLeave, setShowModalLeave] = useState(false);
  const { data: holidayData, isLoading: holidayIsLoading } = useGetHolidayById(id!);
  const { mutate: mutateExportHoliday } = useGetExportHoliday(id!);
  const { mutate: mutateUpdateHoliday } = useUpdateHoliday();
  const { mutate: mutateLeaveHoliday } = useLeaveHoliday();
  const navigate = useNavigate();

  // EXPORT DE L'AGENDA
  const handleDownload = async () => {
    await mutateExportHoliday(undefined, {
      onError: () => alert('Erreur lors de l export de la holiday dans l agenda'),
    });
  };

  const openModalPublish = (): void => {
    setShowModalPublish(true);
  };

  const closeModalPublish = (): void => {
    setShowModalPublish(false);
  };

  const handlePublish = async () => {
    if (holidayData) {
      const formData = new FormData();
      formData.append('name', holidayData.name ?? '');
      formData.append('description', holidayData.description ?? '');
      formData.append('startDate', holidayData.startDate);
      formData.append('endDate', holidayData.endDate);
      formData.append('location.Id', holidayData.location.id!);
      formData.append('location.street', holidayData.location.street ?? '');
      formData.append('location.number', holidayData.location.number ?? '');
      formData.append('location.locality', holidayData.location.locality);
      formData.append('location.postalCode', holidayData.location.postalCode);
      formData.append('location.country', holidayData.location.country);
      formData.append('creatorId', user!.id);
      formData.append('deleteImage', 'false');
      formData.append('initialPath', holidayData.holidayPath);
      formData.append('isPublish', 'true')


      mutateUpdateHoliday(
        { holidayId: id!, updatedHoliday: formData },
        {
          onError: () => alert('Erreur lors de la publication de la vacances.'),
          onSuccess: () => closeModalPublish(),
        }
      );
    }
  };

  const closeModalLeave = (): void => {
    setShowModalLeave(false);
  };

  const openModalLeave = (): void => {
    setShowModalLeave(true);
  };

  const handleLeave = async () => {
    if (holidayData) {
      await mutateLeaveHoliday(id!, {
        onError: () => alert('Erreur'),
        onSuccess: () => navigate('/holidays'),
      });
    }
  };

  return (
    <PageWrapper>
      <PageContent pageTitle={holidayData ? holidayData.name : 'Chargement de la vacance en cours...'}>
        {holidayData ? (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl capitalize lg:text-2xl text-blue-800 font-bold">
                {dayjs(holidayData.startDate).format('DD-MM-YYYY')}
              </h2>
              <div className="flex">
                {holidayData.isPublish ? (
                  <button
                    type="button"
                    className="inline-block bg-blue-800 hover-bg-blue-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
                  >
                    Publiée
                  </button>
                ) : (
                  <button
                    onClick={openModalPublish}
                    type="button"
                    className="inline-block bg-blue-800 hover-bg-blue-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
                  >
                    Publier
                  </button>
                )}

                {!holidayData.isPublish ? (
                  <div>
                    <button
                      onClick={handleDownload}
                      type="button"
                      className="inline-block bg-blue-800 hover-bg-blue-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
                    >
                      Exporter dans l'agenda
                    </button>

                    <button
                      onClick={openModalLeave}
                      type="button"
                      className="inline-block bg-red-600 hover-bg-red-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
                    >
                      Quitter
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col items-center md:flex-row md:flex-wrap md:justify-between">
              <MyHolidayListMembers participants={holidayData.participants} isPublish={holidayData.isPublish} />
              <MyHolidayWeather id={id!} />
            </div>

            <MyHolidayActivities
              id={id!}
              holidayData={holidayData}
              holidayIsLoading={holidayIsLoading}
              isPublish={holidayData.isPublish}
            />

            {showModalPublish && (
              <Modal show={showModalPublish} onClose={closeModalPublish} title="Publier">
                <div className="flex flex-col justify-center items-center w-full">
                  <p className="text-center">
                    Etes-vous sûr de vouloir publier cette période de vacances ? Cela veut dire que tous les utilisateurs
                    pourront la voir.
                  </p>

                  <div className="flex justify-around mt-6 w-full">
                    <button
                      onClick={handlePublish}
                      type="button"
                      className="inline-block bg-blue-800 hover-bg-blue-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
                    >
                      Confirmer
                    </button>

                    <button
                      onClick={closeModalPublish}
                      type="button"
                      className="inline-block bg-red-600 hover-bg-red-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </Modal>
            )}

            {showModalLeave && (
              <Modal show={showModalLeave} onClose={closeModalLeave} title="Quitter">
                <div className="flex flex-col justify-center items-center w-full">
                  <p className="text-center">
                    Etes-vous sûr de vouloir quitter <span className="font-bold text-blue-800">{holidayData.name}</span> ?
                  </p>

                  <div className="flex justify-around mt-6 w-full">
                    <button
                      onClick={handleLeave}
                      type="button"
                      className="inline-block bg-blue-800 hover-bg-blue-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
                    >
                      Confirmer
                    </button>

                    <button
                      onClick={closeModalLeave}
                      type="button"
                      className="inline-block bg-red-600 hover-bg-red-700 text-white font-bold py-1 px-4 rounded-full ml-3.5"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        ) : (
          <Loading></Loading>
        )}
      </PageContent>
    </PageWrapper>
  );
}

export default MyHolidayPage;
