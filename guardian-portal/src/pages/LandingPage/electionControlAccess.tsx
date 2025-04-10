import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Paper, LinearProgress, Tooltip } from '@mui/material'
// import { RegistrationPage } from "../RegistrationPage";
import {
  handleVotingStart,
  handleVotingStop,
  handleTallyingStart,
} from '../../Services/votingServices'
import {
  keyCeremony,
  decryptShare,
  getContext,
  submitTally,
  tallyDecrpy,
  startTally,
} from '../../Services/resultGeneration'
import { useAppProvider } from '../../Hooks/useAppProvider'
import { useHistory } from 'react-router-dom'
import { useGetRequest } from '../../Hooks/useGetRequest'
import { DEV_URL, DEV_URL_2 } from '../../Constants/apiUrls'

export default function ElectionControlAccess({
  activeStep,
  setactiveStep,
  loading,
  setLoading,
  setOpenSnackbar,
  setMsgSnackbar,
  stepsRoute,
  activeButton,
  setActiveButton,
}) {
  const { account }: any = useAppProvider()
  const [confirmModal, setConfirmModal] = useState(false)
  // const [loading, setLoading] = useState(false);
  const [repeat, setRepeat] = useState(false)

  const [tallyData, setTallyData] = useState()
  const [contextData, setContextData] = useState()
  const [startTallyData, setStartTallyData] = useState()
  const { sendPublicKey } = useAppProvider()

  const history = useHistory()

  // useEffect(() => {
  //   var prevStepNo = sessionStorage.getItem("step_no");
  //   if (prevStepNo) {

  //     setactiveStep(prevStepNo - 1);
  //     history.push("/control-panel?step=" + stepsRoute[prevStepNo]);
  //   }
  // }, []);

  // const { response, error, active, total } = useGetRequest(
  //   `${DEV_URL_2}/api/v1/key/ceremony?key_name=${process.env.REACT_APP_KEY_NAME}`,
  //   repeat,
  // )

  const setNextStep = (stepNo) => {
    setactiveStep(stepNo)
    sessionStorage.setItem('step_no', stepNo)
    setActiveButton(false)
  }

  const steps = [
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      ml={2}
      p={1}
      sx={{
        borderStyle: 'solid',
        borderWidth: activeStep === 0 ? 3 : 1,
        borderColor: activeStep === 0 ? '#0CAE7D' : '#CFD0D7',
        backgroundColor: activeStep > 0 && '#DDF3E7',
        boxShadow: activeStep === 0 && 5,
      }}
    >
      <Box width="50px">
        <Typography sx={{ color: activeStep !== 0 && 'gray' }}>1</Typography>
      </Box>

      <Box width="230px">
        <Typography sx={{ color: activeStep !== 0 && 'gray' }}>
          Submit Signature
        </Typography>
      </Box>

      <Box width="550px" display="flex" alignItems="center">
        <Box mr={2} width="400px">
          {activeStep > 0 ? (
            <Typography sx={{ color: activeStep !== 0 && 'gray' }}>
              Successful!
            </Typography>
          ) : (
            <Typography sx={{ color: activeStep !== 0 && 'gray' }}>
              Please wait for all the members to submit signature.
            </Typography>
          )}
        </Box>
        <Box width="100px">
          {loading && activeStep === 0 && <LinearProgress />}
        </Box>
      </Box>

      <Box>
        <Button
          sx={{ textTransform: 'none', borderRadius: 10, width: '200px' }}
          variant="contained"
          disabled={activeStep !== 0 || !activeButton || (loading && true)}
          onClick={async () => {
            setLoading(true)
            try {
              // if (
              //   response["key_ceremonies"][0]["elgamal_public_key"] !== null &&
              //   response["key_ceremonies"][0]["commitment_hash"] !== null
              // ){
              await sendPublicKey()
              // response['key_ceremonies'][0]['elgamal_public_key'],
              // response['key_ceremonies'][0]['commitment_hash'],
              // await sendPublicKeyApi();
              history.push('/control-panel?step=' + stepsRoute[activeStep + 1])
              setNextStep(activeStep + 1)

              // }else{
              //   throw new Error("Please refresh portal.")
              // }

              setLoading(false)
            } catch (error) {
              setLoading(false)
              setOpenSnackbar(true)
              setMsgSnackbar(error.message)
            }
          }}
        >
          Submit Public Key
        </Button>
      </Box>
    </Box>,
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      ml={2}
      p={1}
      sx={{
        borderStyle: 'solid',
        borderWidth: activeStep === 1 ? 3 : 1,
        borderColor: activeStep === 1 ? '#0CAE7D' : '#CFD0D7',
        backgroundColor: activeStep > 1 && '#DDF3E7',
        boxShadow: activeStep === 1 && 5,
      }}
    >
      <Box width="50px">
        <Typography sx={{ color: activeStep !== 1 && 'gray' }}>2</Typography>
      </Box>

      <Box width="230px">
        <Typography sx={{ color: activeStep !== 1 && 'gray' }}>
          Voter's Registration
        </Typography>
      </Box>

      {activeStep === 1 || activeStep > 1 ? (
        <Box width="550px" display="flex" alignItems="center">
          <Box mr={2} width="400px">
            {activeStep > 1 ? (
              <Typography sx={{ color: activeStep !== 1 && 'gray' }}>
                Successful!
              </Typography>
            ) : (
              <Typography sx={{ color: activeStep !== 1 && 'gray' }}>
                Please wait for all the voters to register.
              </Typography>
            )}
          </Box>
          <Box width="100px">
            {loading && activeStep === 1 && <LinearProgress />}
          </Box>
        </Box>
      ) : (
        <Box width="550px"></Box>
      )}

      <Box>
        <Tooltip title="Registration will be closed.">
          <Button
            sx={{ textTransform: 'none', borderRadius: 10, width: '200px' }}
            variant="contained"
            disabled={activeStep !== 1 || !activeButton || (loading && true)}
            onClick={async () => {
              try {
                setLoading(true)
                await handleVotingStart(account)

                // await handleVotingStop(account);
                history.push(
                  '/control-panel?step=' + stepsRoute[activeStep + 1],
                )

                setNextStep(activeStep + 1)
                setLoading(false)
              } catch (error) {
                setLoading(false)
                setOpenSnackbar(true)
                setMsgSnackbar(error.message)
              }
            }}
          >
            Press to Start Voting
          </Button>
        </Tooltip>
      </Box>
    </Box>,

    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      ml={2}
      p={1}
      sx={{
        borderStyle: 'solid',
        borderWidth: activeStep === 2 ? 3 : 1,
        borderColor: activeStep === 2 ? '#0CAE7D' : '#CFD0D7',
        backgroundColor: activeStep > 2 && '#DDF3E7',
        boxShadow: activeStep === 2 && 5,
      }}
    >
      <Box width="50px">
        <Typography sx={{ color: activeStep !== 2 && 'gray' }}>3</Typography>
      </Box>

      <Box width="230px">
        <Typography sx={{ color: activeStep !== 2 && 'gray' }}>
          Voting
        </Typography>
      </Box>

      {activeStep === 2 || activeStep > 2 ? (
        <Box width="550px" display="flex" alignItems="center">
          <Box mr={2} width="400px">
            {activeStep > 2 ? (
              <Typography sx={{ color: activeStep !== 2 && 'gray' }}>
                Successful!
              </Typography>
            ) : (
              <Typography sx={{ color: activeStep !== 2 && 'gray' }}>
                Please wait for all the voters to vote.
              </Typography>
            )}
          </Box>
          <Box width="100px">
            {loading && activeStep === 2 && <LinearProgress />}
          </Box>
        </Box>
      ) : (
        <Box width="550px"></Box>
      )}

      <Box>
        <Tooltip title="Voting will be closed">
          <Button
            sx={{ textTransform: 'none', borderRadius: 10, width: '200px' }}
            variant="contained"
            disabled={activeStep !== 2 || !activeButton || (loading && true)}
            onClick={async () => {
              setLoading(true)
              try {
                await handleVotingStop(account)

                history.push(
                  '/control-panel?step=' + stepsRoute[activeStep + 1],
                )
                setNextStep(activeStep + 1)
                setLoading(false)
              } catch (error) {
                setLoading(false)
                setOpenSnackbar(true)
                setMsgSnackbar(error.message)
              }
            }}
          >
            Press to Start Tally
          </Button>
        </Tooltip>
      </Box>
    </Box>,

    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      ml={2}
      p={1}
      sx={{
        borderStyle: 'solid',
        borderWidth: activeStep === 3 ? 3 : 1,
        borderColor: activeStep === 3 ? '#0CAE7D' : '#CFD0D7',
        backgroundColor: activeStep > 3 && '#DDF3E7',
        boxShadow: activeStep === 3 && 5,
      }}
    >
      <Box width="50px">
        <Typography sx={{ color: activeStep !== 3 && 'gray' }}>4</Typography>
      </Box>

      <Box width="230px">
        <Typography sx={{ color: activeStep !== 3 && 'gray' }}>
          Start Tally
        </Typography>
      </Box>

      {activeStep === 3 || activeStep > 3 ? (
        <Box width="550px" display="flex" alignItems="center">
          <Box mr={2} width="400px">
            {activeStep > 3 ? (
              <Typography sx={{ color: activeStep !== 3 && 'gray' }}>
                Successful!
              </Typography>
            ) : (
              <Typography sx={{ color: activeStep !== 3 && 'gray' }}>
                Please wait for the tally to start.
              </Typography>
            )}
          </Box>
          <Box width="100px">
            {loading && activeStep === 3 && <LinearProgress />}
          </Box>
        </Box>
      ) : (
        <Box width="550px"></Box>
      )}

      <Box>
        <Button
          sx={{ textTransform: 'none', borderRadius: 10, width: '200px' }}
          variant="contained"
          disabled={activeStep !== 3 || (loading && true)}
          onClick={async () => {
            try {
              setLoading(true)
              // await handleTallyingStart();

              let resStartTally = await startTally()
              setStartTallyData(resStartTally)
              sessionStorage.setItem(
                'start_tally_data',
                JSON.stringify(resStartTally),
              )
              setLoading(false)
              history.push('/control-panel?step=' + stepsRoute[activeStep + 1])
              setNextStep(activeStep + 1)
            } catch (error) {
              setLoading(false)
              setOpenSnackbar(true)
              setMsgSnackbar(error.message)
              // throw new Error(error.message);
            }
          }}
        >
          Press to Get Context
        </Button>
      </Box>
    </Box>,

    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      ml={2}
      p={1}
      sx={{
        borderStyle: 'solid',
        borderWidth: activeStep === 4 ? 3 : 1,
        borderColor: activeStep === 4 ? '#0CAE7D' : '#CFD0D7',
        backgroundColor: activeStep > 4 && '#DDF3E7',
        boxShadow: activeStep === 4 && 5,
      }}
    >
      <Box width="50px">
        <Typography sx={{ color: activeStep !== 4 && 'gray' }}>5</Typography>
      </Box>

      <Box width="230px">
        <Typography sx={{ color: activeStep !== 4 && 'gray' }}>
          Get Context
        </Typography>
      </Box>

      {activeStep === 4 || activeStep > 4 ? (
        <Box width="550px" display="flex" alignItems="center">
          <Box mr={2} width="400px">
            {activeStep > 4 ? (
              <Typography sx={{ color: activeStep !== 4 && 'gray' }}>
                Successful!
              </Typography>
            ) : (
              <Typography sx={{ color: activeStep !== 4 && 'gray' }}>
                Please wait to get context.
              </Typography>
            )}
          </Box>
          <Box width="100px">
            {loading && activeStep === 4 && <LinearProgress />}
          </Box>
        </Box>
      ) : (
        <Box width="550px"></Box>
      )}

      <Box>
        <Button
          sx={{ textTransform: 'none', borderRadius: 10, width: '200px' }}
          variant="contained"
          disabled={activeStep !== 4 || (loading && true)}
          onClick={async () => {
            setLoading(true)

            try {
              let resContext: any = await getContext()
              setContextData(resContext.elections[0].context)
              sessionStorage.setItem(
                'context_data',
                JSON.stringify(resContext.elections[0].context),
              )
              setNextStep(activeStep + 1)
              history.push('/control-panel?step=' + stepsRoute[activeStep + 1])
              setLoading(false)
            } catch (error) {
              setLoading(false)
              setOpenSnackbar(true)
              setMsgSnackbar(error.message)
              // throw new Error(error.message);
            }
          }}
        >
          Submit to Compute Tally
        </Button>
      </Box>
    </Box>,

    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      ml={2}
      p={1}
      sx={{
        borderStyle: 'solid',
        borderWidth: activeStep === 5 ? 3 : 1,
        borderColor: activeStep === 5 ? '#0CAE7D' : '#CFD0D7',
        backgroundColor: activeStep > 5 && '#DDF3E7',
        boxShadow: activeStep === 5 && 5,
      }}
    >
      <Box width="50px">
        <Typography sx={{ color: activeStep !== 5 && 'gray' }}>6</Typography>
      </Box>

      <Box width="230px">
        <Typography sx={{ color: activeStep !== 5 && 'gray' }}>
          Compute Tally
        </Typography>
      </Box>

      {activeStep === 5 || activeStep > 5 ? (
        <Box width="550px" display="flex" alignItems="center">
          <Box mr={2} width="400px">
            {activeStep > 5 ? (
              <Typography sx={{ color: activeStep !== 5 && 'gray' }}>
                Successful!
              </Typography>
            ) : (
              <Typography sx={{ color: activeStep !== 5 && 'gray' }}>
                Please wait for all the members to compute tally.
              </Typography>
            )}
          </Box>
          <Box width="100px">
            {loading && activeStep === 5 && <LinearProgress />}
          </Box>
        </Box>
      ) : (
        <Box width="550px"></Box>
      )}

      <Box>
        <Button
          sx={{ textTransform: 'none', borderRadius: 10, width: '200px' }}
          variant="contained"
          disabled={activeStep !== 5 || (loading && true)}
          onClick={async () => {
            setLoading(true)
            try {
              // let resKeyCeremony = await keyCeremony();
              let guardianId = process.env.REACT_APP_GUARDIAN_ID
              let resDecryptShare = await decryptShare(
                contextData
                  ? contextData
                  : JSON.parse(sessionStorage.getItem('context_data')),
                startTallyData
                  ? startTallyData
                  : JSON.parse(sessionStorage.getItem('start_tally_data')),
                guardianId,
              )

              // let resShareSubmit = await submitTally(resDecryptShare.shares[0]);
              // console.log(resDecryptShare.shares[0], "SUBMIT TALLY DATA");

              history.push('/control-panel?step=' + stepsRoute[activeStep + 1])
              setNextStep(activeStep + 1)
              setLoading(false)
            } catch (error) {
              setLoading(false)
              setOpenSnackbar(true)
              setMsgSnackbar(error.message)
              // throw new Error(error.message);
            }
          }}
        >
          Press to Decrypt Tally
        </Button>
      </Box>
    </Box>,

    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      ml={2}
      p={1}
      sx={{
        borderStyle: 'solid',
        borderWidth: activeStep === 6 ? 3 : 1,
        borderColor: activeStep === 6 ? '#0CAE7D' : '#CFD0D7',
        backgroundColor: activeStep > 6 && '#DDF3E7',
        boxShadow: activeStep === 6 && 5,
      }}
    >
      <Box width="50px">
        <Typography sx={{ color: activeStep !== 6 && 'gray' }}>7</Typography>
      </Box>

      <Box width="230px">
        <Typography sx={{ color: activeStep !== 6 && 'gray' }}>
          Decrypt Tally
        </Typography>
      </Box>

      {activeStep === 6 || activeStep > 6 ? (
        <Box width="550px" display="flex" alignItems="center">
          <Box mr={2} width="400px">
            {activeStep > 6 ? (
              <Typography sx={{ color: activeStep !== 6 && 'gray' }}>
                Successful!
              </Typography>
            ) : (
              <Typography sx={{ color: activeStep !== 6 && 'gray' }}>
                Please wait for all the members to decrypt tally.
              </Typography>
            )}
          </Box>
          <Box width="100px">
            {loading && activeStep === 6 && <LinearProgress />}
          </Box>
        </Box>
      ) : (
        <Box width="550px"></Box>
      )}

      <Box>
        <Button
          sx={{ textTransform: 'none', borderRadius: 10, width: '200px' }}
          variant="contained"
          disabled={activeStep !== 6 || (loading && true)}
          onClick={async () => {
            setLoading(true)
            try {
              let resTallyDecryt = await tallyDecrpy(
                startTallyData
                  ? startTallyData
                  : JSON.parse(sessionStorage.getItem('start_tally_data')),
              )
              sessionStorage.setItem(
                'decrypted_tally',
                JSON.stringify(resTallyDecryt.tallies[0]),
              )
              history.push('/control-panel?step=' + stepsRoute[activeStep + 1])
              setNextStep(activeStep + 1)
              setLoading(false)
              // history.push("/election-contest/result");
            } catch (error) {
              setLoading(false)
              setOpenSnackbar(true)
              setMsgSnackbar(error.message)
              setNextStep(5)

              // throw new Error(error.message);
            }
            setNextStep(activeStep + 1)
          }}
        >
          Press to Decrypt Tally
        </Button>
      </Box>
    </Box>,

    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      ml={2}
      p={1}
      sx={{
        borderStyle: 'solid',
        borderWidth: activeStep === 7 ? 3 : 1,
        borderColor: activeStep === 7 ? '#0CAE7D' : '#CFD0D7',
        backgroundColor: activeStep > 7 && '#DDF3E7',
        boxShadow: activeStep === 7 && 5,
      }}
    >
      <Box width="50px">
        <Typography sx={{ color: activeStep !== 7 && 'gray' }}>8</Typography>
      </Box>

      <Box width="230px">
        <Typography sx={{ color: activeStep !== 7 && 'gray' }}>
          See Results
        </Typography>
      </Box>

      {activeStep === 7 || activeStep > 7 ? (
        <Box width="550px" display="flex" alignItems="center">
          <Box mr={2} width="400px">
            {activeStep > 7 ? (
              <Typography sx={{ color: activeStep !== 7 && 'gray' }}>
                Successful!
              </Typography>
            ) : (
              <Typography sx={{ color: activeStep !== 7 && 'gray' }}>
                Please wait for the result to be computed.
              </Typography>
            )}
          </Box>
          <Box width="100px">
            {loading && activeStep === 7 && <LinearProgress />}
          </Box>
        </Box>
      ) : (
        <Box width="550px"></Box>
      )}

      <Box>
        <Button
          sx={{ textTransform: 'none', borderRadius: 10, width: '200px' }}
          variant="contained"
          disabled={activeStep !== 7 || (loading && true)}
          onClick={() => {
            sessionStorage.setItem('context_data', 7)
            history.push('/election-contest/result')
          }}
        >
          See results
        </Button>
      </Box>
    </Box>,
  ]

  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* {steps[activeStep]} */}
    </Box>
  )
}
