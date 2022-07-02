import { GetServerSideProps } from 'next'

import { getExpertisePostDetails } from '../../redux/actionCreators/expertisePostActions'
import { wrapper } from '../../redux/store'

import Layout from '../../components/layout/Layout'
import ExpertisePostDetails from '../../components/expertisePost/ExpertisePostDetails'
import { getReviews } from '../../redux/actionCreators/reviewActionCreator'



export default function ExpertisePostDetailsPage() {
  return (
    <Layout>
        <ExpertisePostDetails />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async ({ req, params }) => {
  try {
      await store.dispatch(getExpertisePostDetails(req, params?.id))
      await store.dispatch(getReviews(req, params?.id))
      return { props: {} }
  } catch (e) {
      return { props: {} }
  }
})