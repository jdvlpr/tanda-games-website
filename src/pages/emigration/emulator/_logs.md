GAME 1
[1] INIT|P0|NAT:Bosnian|DEST:China|$2|FACEUP:[4:Payday,5:Island Paradise,6:Internship in Your Destination,11:Pandemic / Economic Stimulus,12:Swap Wallets,13:Residence Address in Destination]
[1] INIT|P1|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Payday,5:Rummage Sale,6:Letter of Invitation,11:Endorsement from Royalty,12:Attend History Class,13:Learn from an Elder]
[1] T1|P0|ACT:Swap Wallets
[1] T1|P0|ACT:Swap Wallets|SWAP:P1
[2] T2|P1|PAY_FEE:1|TO:P0
[2] T2|P1|DISC:Residence Address in Destination|FROM:P0|GAIN:2
[2] T2|P0|REV|S9:Payday
[2] T2|P0|REV|S10:Travel Concierge
[3] T3|ROLL_D6:3
[3] T3|P0|COLLEGE_APP|ROLL:3|TUITION:4|RES:PASS
[4] T4|P1|BUY:Endorsement from Royalty|FROM:P1|COST:3
[4] T4|P1|REV|S7:Vehicle Registration Papers
[5] T5|ROLL_D6:5
[5] T5|P0|GRAD|ROLL:5|RES:FAIL
[5] T5|P0|ACT:Pandemic / Economic Stimulus
[5] T5|ROLL_D6:3
[5] T5|P0|ACT:PANDEMIC_STIMULUS|DELTA:[-3,0]
[5] T5|P0|REV|S7:Dinner with a Diplomat
[5] T5|P0|REV|S8:Stellar Reputation
[6] T6|P1|SELL:Endorsement from Royalty|GAIN:2
[6] T6|P1|PAY_FEE:2|TO:P0
[6] T6|P1|DISC:Dinner with a Diplomat|FROM:P0|GAIN:2
[7] T7|ROLL_D6:4
[7] T7|P0|GRAD|ROLL:4|RES:FAIL
[7] T7|P0|ACT:Stellar Reputation
[7] T7|P0|ACT:Stellar Reputation|GAIN:3
[8] T8|P1|DISC:Vehicle Registration Papers|FROM:P1|GAIN:2
[9] T9|ROLL_D6:5
[9] T9|P0|GRAD|ROLL:5|RES:FAIL
[9] T9|P0|BUY:Travel Concierge|FROM:P0|COST:4
[10] T10|P1|BUY:Learn from an Elder|FROM:P1|COST:3
[10] T10|P1|REV|S10:Employment Contract
[11] T11|ROLL_D6:5
[11] T11|P0|GRAD|ROLL:5|RES:FAIL
[11] T11|P0|STEAL:Ticket|SKIP_NEXT
[12] T12|P1|SELL:Learn from an Elder|GAIN:2
[12] T12|P1|DISC:Attend History Class|FROM:P1|GAIN:2
[12] T12|P1|REV|S8:Pandemic / Economic Stimulus
[12] T12|P1|REV|S9:Payday
[13] T13|P0|SKIP_TURN
[14] T14|P1|BUY:Employment Contract|FROM:P1|COST:4
[15] T15|ROLL_D6:3
[15] T15|P0|GRAD|ROLL:3|RES:PASS|SALARY_INC:1
[15] T15|P0|ACT:Payday
[15] T15|PAYDAY|SALARIES:[2,1]
[15] T15|P0|REV|S0:Background Check
[16] T16|P1|STEAL:Passport|SKIP_NEXT
[17] T17|P0|ACT:Payday
[17] T17|PAYDAY|SALARIES:[2,1]
[18] T18|P1|SKIP_TURN
[19] T19|P0|BUY:Background Check|FROM:P0|COST:4
[20] T20|P1|ACT:Pandemic / Economic Stimulus
[20] T20|ROLL_D6:1
[20] T20|P1|ACT:PANDEMIC_STIMULUS|DELTA:[1,1]
[21] T21|P0|STEAL:Ticket|SKIP_NEXT
[22] T22|P1|PAY_FEE:3|TO:P0
[22] T22|P1|DISC:Internship in Your Destination|FROM:P0|GAIN:2
[22] T22|P0|REV|S3:Payday
[23] T23|P0|SKIP_TURN
[24] T24|P1|ACT:Payday
[24] T24|PAYDAY|SALARIES:[2,1]
[25] T25|P0|STEAL:Passport|SKIP_NEXT
[25] T25|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[26] T26|P1|BUY:Letter of Invitation|FROM:P1|COST:4
[26] T26|P1|REV|S3:Payday
[27] T27|P0|SKIP_TURN
[28] T28|P1|SELL:Employment Contract|GAIN:2
[28] T28|P1|ACT:Rummage Sale
[28] T28|P1|ACT:Rummage Sale|GAIN:3
[28] T28|P1|REV|S2:Payday
[29] T29|P0|ACT:Payday
[29] T29|PAYDAY|SALARIES:[2,1]
[30] T30|P1|RECLAIM:Ticket|FROM:P0|COST:6
[30] T30|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[31] T31|P0|ACT:Island Paradise
[31] T31|P0|ACT:Island Paradise|DELTA:[2,1]
[31] T31|P0|REV|S1:Mental Fog
[31] T31|P0|REV|S2:Copy of Birth Certificate
[32] T32|P1|SELL:Letter of Invitation|GAIN:2
[32] T32|P1|ACT:Payday
[32] T32|PAYDAY|SALARIES:[2,1]
[32] T32|P1|REV|S0:Learn Song from Your Destination
[32] T32|P1|REV|S1:Payday
[33] T33|P0|BUY:Copy of Birth Certificate|FROM:P0|COST:2
[34] T34|P1|ACT:Payday
[34] T34|PAYDAY|SALARIES:[2,1]
[35] T35|P0|SELL:Travel Concierge|GAIN:2
[35] T35|ROLL_D6:5
[35] T35|P0|COLLEGE_APP|ROLL:5|TUITION:7|RES:PASS
[36] T36|P1|ACT:Payday
[36] T36|PAYDAY|SALARIES:[0,1]
[37] T37|ROLL_D6:5
[37] T37|P0|GRAD|ROLL:5|RES:FAIL
[37] T37|P0|ACT:Mental Fog
[37] T37|P0|ACT:Mental Fog|LOSS:1
[38] T38|P1|ACT:Payday
[38] T38|PAYDAY|SALARIES:[0,1]
[39] T39|ROLL_D6:6
[39] T39|P0|GRAD|ROLL:6|RES:FAIL
[39] T39|P0|PAY_FEE:1|TO:P1
[39] T39|P0|DISC:Learn Song from Your Destination|FROM:P1|GAIN:2
[39] PHASE2_START
[39] PHASE2|P0|TRADE|$10:+3A|TOTAL_A:6
[39] PHASE2|P1|TRADE|$6:+2A|PEN_D:-2A|TOTAL_A:1
[39] PHASE2|P0|SELECT_LANE:Lane 1|TKN:7
[39] PHASE2|P0|CROSS:FAIL_LOW_A
[39] PHASE2|P1|SELECT_LANE:Lane 1|TKN:6
[39] PHASE2|P1|CROSS:FAIL_LOW_A
[39] GAME_OVER|WINNER (no one crossed, most Money): Player 1 ($4)

GAME 2
[1] INIT|P0|NAT:Bosnian|DEST:China|$2|FACEUP:[4:Politician Approves You,5:Stellar Reputation,6:Mental Fog,11:Payday,12:Pandemic / Economic Stimulus,13:Video Chat with Person from Destination]
[1] INIT|P1|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Attend Security Training,5:Coffee with Airport Employee,6:Rummage Sale,11:Swap Wallets,12:Personality Test,13:Insider]
[1] T1|P0|BUY:Video Chat with Person from Destination|FROM:P0|COST:2
[1] T1|P0|REV|S10:Endorsement from Royalty
[2] T2|P1|BUY:Personality Test|FROM:P1|COST:3
[3] ERR|NO_FUNDS_1
[3] T3|P0|ACT:Pandemic / Economic Stimulus
[3] T3|ROLL_D6:4
[3] T3|P0|ACT:PANDEMIC_STIMULUS|DELTA:[0,-3]
[3] T3|P0|REV|S9:Island Paradise
[4] T4|P1|SELL:Personality Test|GAIN:2
[4] T4|P1|PAY_FEE:1|TO:P0
[4] T4|P1|DISC:Endorsement from Royalty|FROM:P0|GAIN:2
[5] T5|P0|ACT:Island Paradise
[5] T5|P0|ACT:Island Paradise|DELTA:[2,1]
[6] T6|ROLL_D6:6
[6] T6|P1|COLLEGE_APP|ROLL:6|TUITION:12|RES:FAIL
[6] T6|P1|ACT:Swap Wallets
[6] T6|P1|ACT:Swap Wallets|SWAP:P0
[6] T6|P1|REV|S7:Payday
[6] T6|P1|REV|S8:Dinner with a Diplomat
[7] T7|P0|STEAL:Ticket|SKIP_NEXT
[8] T8|P1|BUY:Dinner with a Diplomat|FROM:P1|COST:3
[9] T9|P0|SKIP_TURN
[10] T10|P1|SELL:Dinner with a Diplomat|GAIN:2
[10] T10|P1|ACT:Insider
[10] T10|P1|KEEP:Insider
[10] T10|P1|REV|S9:Payday
[10] T10|P1|REV|S10:Payday
[11] T11|P0|STEAL:Ticket|SKIP_NEXT
[12] T12|P1|ACT:Payday
[12] T12|PAYDAY|SALARIES:[1,2]
[13] T13|P0|SKIP_TURN
[14] T14|P1|RECLAIM:Ticket|FROM:P0|COST:4
[15] T15|ROLL_D6:6
[15] T15|P0|COLLEGE_APP|ROLL:6|TUITION:8|RES:PASS
[16] T16|P1|ACT:Payday
[16] T16|PAYDAY|SALARIES:[0,2]
[17] T17|P0|ACT:Mental Fog
[17] T17|P0|ACT:Mental Fog|LOSS:1
[17] T17|P0|ACT:Mental Fog|DISC_STASH:Insider|FROM:P1
[17] T17|P0|REV|S3:Payday
[18] T18|P1|ACT:Rummage Sale
[18] T18|P1|ACT:Rummage Sale|GAIN:3
[18] T18|P1|REV|S3:Pandemic / Economic Stimulus
[19] T19|ROLL_D6:6
[19] T19|P0|GRAD|ROLL:6|RES:FAIL
[19] ERR|NO_FUNDS_1
[19] T19|P0|ACT:Payday
[19] T19|PAYDAY|SALARIES:[0,1]
[20] T20|P1|ACT:Pandemic / Economic Stimulus
[20] T20|ROLL_D6:1
[20] T20|P1|ACT:PANDEMIC_STIMULUS|DELTA:[1,1]
[21] T21|ROLL_D6:3
[21] T21|P0|GRAD|ROLL:3|RES:PASS|SALARY_INC:1
[21] T21|P0|ACT:Payday
[21] T21|PAYDAY|SALARIES:[2,1]
[21] T21|P0|REV|S7:Payday
[21] T21|P0|REV|S8:Pet Passport
[22] T22|P1|PAY_FEE:3|TO:P0
[22] T22|P1|BUY:Pet Passport|FROM:P0|COST:4
[23] T23|P0|PAY_FEE:1|TO:P1
[23] T23|P0|BUY:Coffee with Airport Employee|FROM:P1|COST:2
[23] T23|P1|REV|S2:Letter of Invitation
[24] T24|P1|STEAL:Passport|SKIP_NEXT
[24] T24|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[25] T25|P0|ACT:Stellar Reputation
[25] T25|P0|ACT:Stellar Reputation|GAIN:3
[25] T25|P0|REV|S2:Payday
[26] T26|P1|SKIP_TURN
[27] T27|P0|PAY_FEE:2|TO:P1
[27] T27|P0|BUY:Letter of Invitation|FROM:P1|COST:4
[28] T28|P1|ACT:Payday
[28] T28|PAYDAY|SALARIES:[2,1]
[29] T29|P0|ACT:Payday
[29] T29|PAYDAY|SALARIES:[2,1]
[30] T30|P1|BUY:Attend Security Training|FROM:P1|COST:3
[30] T30|P1|REV|S0:Physical Exam
[30] T30|P1|REV|S1:Language Classes
[31] T31|P0|STEAL:Passport|SKIP_NEXT
[31] T31|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[32] T32|P1|DISC:Language Classes|FROM:P1|GAIN:2
[33] T33|P0|SKIP_TURN
[34] T34|P1|DISC:Physical Exam|FROM:P1|GAIN:2
[35] T35|P0|ACT:Payday
[35] T35|PAYDAY|SALARIES:[2,1]
[36] T36|P1|PAY_FEE:4|TO:P0
[36] T36|P1|DISC:Politician Approves You|FROM:P0|GAIN:2
[36] T36|P0|REV|S0:International Driving Permit
[36] T36|P0|REV|S1:Payday
[37] T37|P0|BUY:International Driving Permit|FROM:P0|COST:4
[38] T38|ROLL_D6:1
[38] T38|P1|COLLEGE_APP|ROLL:1|TUITION:4|RES:PASS
[39] T39|P0|ACT:Payday
[39] T39|PAYDAY|SALARIES:[2,0]
[39] PHASE2_START
[39] PHASE2|P0|TRADE|TOTAL_A:3
[39] PHASE2|P1|TRADE|TOTAL_A:1
[39] PHASE2|P0|SELECT_LANE:Lane 5|TKN:3
[39] PHASE2|P0|CROSS:PASS|PAID_A:3|REM_A:0
[39] PHASE2|P1|SELECT_LANE:Lane 1|TKN:7
[39] PHASE2|P1|CROSS:FAIL_LOW_A
[39] GAME_OVER|WINNER: Player 1 (Assurance: 0, Money: $8)

GAME 3
[1] INIT|P0|NAT:Russian|DEST:England|$5|FACEUP:[4:Payday,5:Payday,6:Certificate of Excellence,11:Payday,12:Pet Passport,13:International Driving Permit]
[1] INIT|P1|NAT:American|DEST:Bosnia and Herzegovina|$6|FACEUP:[4:Favorable Cultural Opinion,5:Internship in Your Destination,6:Payday,11:Payday,12:Attend Security Training,13:Become World Famous]
[1] T1|P0|BUY:Pet Passport|FROM:P0|COST:4
[2] T2|P1|BUY:Attend Security Training|FROM:P1|COST:3
[3] T3|P0|STEAL:Passport|SKIP_NEXT
[4] T4|P1|BUY:Become World Famous|FROM:P1|COST:3
[4] T4|P1|REV|S9:Payday
[4] T4|P1|REV|S10:Physical Exam
[5] T5|P0|SKIP_TURN
[6] T6|P1|SELL:Attend Security Training|GAIN:2
[6] T6|P1|STEAL:Ticket|SKIP_NEXT
[7] T7|P0|ACT:Payday
[7] T7|PAYDAY|SALARIES:[1,1]
[7] T7|P0|REV|S7:Insider
[7] T7|P0|REV|S8:Mental Fog
[8] T8|P1|SKIP_TURN
[9] T9|P0|ACT:Insider
[9] T9|P0|KEEP:Insider
[10] T10|P1|BUY:Physical Exam|FROM:P1|COST:3
[11] T11|P0|ACT:Mental Fog
[11] T11|P0|ACT:Mental Fog|LOSS:1
[12] T12|P1|SELL:Physical Exam|GAIN:2
[12] T12|P1|PAY_FEE:1|TO:P0
[12] T12|P1|DISC:International Driving Permit|FROM:P0|GAIN:2
[12] T12|P0|REV|S9:Payday
[12] T12|P0|REV|S10:Pandemic / Economic Stimulus
[13] T13|P0|ACT:Payday
[13] T13|PAYDAY|SALARIES:[2,1]
[14] T14|P1|ACT:Payday
[14] T14|PAYDAY|SALARIES:[2,1]
[14] T14|P1|REV|S7:Travel Concierge
[14] T14|P1|REV|S8:Rummage Sale
[15] T15|P0|PAY_FEE:1|TO:P1
[15] T15|P0|BUY:Travel Concierge|FROM:P1|COST:4
[16] T16|P1|ACT:Rummage Sale
[16] T16|P1|ACT:Rummage Sale|GAIN:3
[17] T17|P0|STEAL:Ticket|SKIP_NEXT
[17] T17|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[18] T18|P1|ACT:Payday
[18] T18|PAYDAY|SALARIES:[2,1]
[19] T19|P0|SKIP_TURN
[20] T20|P1|ACT:Payday
[20] T20|PAYDAY|SALARIES:[2,1]
[20] T20|P1|REV|S3:Payday
[21] ERR|NO_FUNDS_6
[21] T21|P0|ACT:Pandemic / Economic Stimulus
[21] T21|ROLL_D6:5
[21] T21|P0|ACT:PANDEMIC_STIMULUS|DELTA:[-5,-5]
[22] T22|P1|PAY_FEE:2|TO:P0
[22] T22|P1|BUY:Certificate of Excellence|FROM:P0|COST:2
[22] T22|P0|REV|S3:Letter of Recommendation
[23] ERR|NO_FUNDS_3
[23] T23|P0|ACT:Payday
[23] T23|PAYDAY|SALARIES:[2,1]
[23] T23|P0|REV|S2:Cookies for Neighbor from Destination
[24] T24|P1|STEAL:Passport|SKIP_NEXT
[24] T24|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[25] T25|P0|BUY:Letter of Recommendation|FROM:P0|COST:3
[26] T26|P1|SKIP_TURN
[27] T27|P0|ACT:Payday
[27] T27|PAYDAY|SALARIES:[2,1]
[27] T27|P0|REV|S0:Network Fair
[27] T27|P0|REV|S1:Island Paradise
[28] T28|P1|PAY_FEE:3|TO:P0
[28] T28|P1|DISC:Network Fair|FROM:P0|GAIN:2
[29] T29|P0|BUY:Cookies for Neighbor from Destination|FROM:P0|COST:2
[30] T30|P1|ACT:Payday
[30] T30|PAYDAY|SALARIES:[2,1]
[31] T31|P0|PAY_FEE:2|TO:P1
[31] T31|P0|BUY:Favorable Cultural Opinion|FROM:P1|COST:4
[31] T31|P1|REV|S0:Stellar Reputation
[32] T32|P1|ACT:Stellar Reputation
[32] T32|P1|KEEP:Stellar Reputation
[33] T33|P0|ACT:Island Paradise
[33] T33|P0|ACT:Island Paradise|DELTA:[1,1]
[34] T34|P1|DISC:Internship in Your Destination|FROM:P1|GAIN:2
[34] T34|P1|REV|S1:Pandemic / Economic Stimulus
[34] T34|P1|REV|S2:Politician Approves You
[35] T35|P0|FORFEIT|CONS:1
[36] T36|P1|ACT:Pandemic / Economic Stimulus
[36] T36|ROLL_D6:2
[36] T36|P1|ACT:PANDEMIC_STIMULUS|DELTA:[2,2]
[37] T37|P0|PAY_FEE:3|TO:P1
[37] T37|P0|DISC:Politician Approves You|FROM:P1|GAIN:2
[37] PHASE2_START
[37] PHASE2|P0|TRADE|3C:+4A|PEN_M:-2A|TOTAL_A:3
[37] PHASE2|P1|TRADE|$12:+4A|PEN_D:-2A|TOTAL_A:3
[37] PHASE2|P0|SELECT_LANE:Lane 5|TKN:9
[37] PHASE2|P0|CROSS:FAIL_LOW_A
[37] PHASE2|P1|SELECT_LANE:Lane 5|TKN:11
[37] PHASE2|P1|CROSS:FAIL_LOW_A
[37] GAME_OVER|WINNER (no one crossed, most Money): Player 1 ($2)

GAME 4
[1] INIT|P0|NAT:Congolese|DEST:Senegal|$2|FACEUP:[4:Subscribe to Travel Updates,5:Payday,6:Island Paradise,11:Attend Security Training,12:Employment Contract,13:Share]
[1] INIT|P1|NAT:Senegalese|DEST:Russia|$3|FACEUP:[4:Become World Famous,5:Payday,6:Video Chat with Person from Destination,11:Swap Wallets,12:Attend History Class,13:Stellar Reputation]
[1] T1|P0|PAY_FEE:1|TO:P1
[1] T1|P0|ACT:Stellar Reputation
[1] T1|P0|KEEP:Stellar Reputation
[1] T1|P1|REV|S10:Bailout
[2] T2|P1|PAY_FEE:1|TO:P0
[2] T2|P1|BUY:Attend Security Training|FROM:P0|COST:3
[2] T2|P0|REV|S7:Coffee with Airport Employee
[3] T3|P0|BUY:Coffee with Airport Employee|FROM:P0|COST:1
[4] T4|P1|SELL:Attend Security Training|GAIN:2
[4] T4|ROLL_D6:1
[4] T4|P1|COLLEGE_APP|ROLL:1|TUITION:2|RES:PASS
[5] T5|P0|STEAL:Ticket|SKIP_NEXT
[6] T6|ROLL_D6:4
[6] T6|P1|GRAD|ROLL:4|RES:FAIL
[6] T6|P1|ACT:Swap Wallets
[6] T6|P1|ACT:Swap Wallets|SWAP:P0
[6] T6|P1|REV|S7:Dinner with a Diplomat
[7] T7|P0|SKIP_TURN
[8] T8|ROLL_D6:6
[8] T8|P1|GRAD|ROLL:6|RES:FAIL
[8] T8|P1|ACT:Bailout
[8] T8|P1|ACT:Bailout|DELTA:[1,1]
[9] T9|P0|ACT:Share
[9] T9|P0|ACT:Share|DELTA:[0,0]
[9] T9|P0|REV|S10:Payday
[10] T10|ROLL_D6:6
[10] T10|P1|GRAD|ROLL:6|RES:FAIL
[10] T10|P1|PAY_FEE:2|TO:P0
[10] T10|P1|DISC:Employment Contract|FROM:P0|GAIN:2
[10] T10|P0|REV|S8:Payday
[10] T10|P0|REV|S9:Residence Address in Destination
[11] T11|P0|ACT:Payday
[11] T11|PAYDAY|SALARIES:[1,0]
[12] T12|ROLL_D6:4
[12] T12|P1|GRAD|ROLL:4|RES:FAIL
[12] T12|P1|DISC:Attend History Class|FROM:P1|GAIN:2
[12] T12|P1|REV|S8:Philanthropy
[12] T12|P1|REV|S9:Rummage Sale
[13] T13|P0|BUY:Residence Address in Destination|FROM:P0|COST:3
[14] T14|ROLL_D6:1
[14] T14|P1|GRAD|ROLL:1|RES:PASS|SALARY_INC:1
[14] T14|P1|BUY:Dinner with a Diplomat|FROM:P1|COST:3
[15] T15|P0|ACT:Payday
[15] T15|PAYDAY|SALARIES:[1,2]
[16] T16|P1|STEAL:Ticket|SKIP_NEXT
[17] T17|P0|STEAL:Passport|SKIP_NEXT
[17] T17|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[18] T18|P1|SKIP_TURN
[19] T19|P0|SKIP_TURN
[20] T20|P1|ACT:Rummage Sale
[20] T20|P1|ACT:Rummage Sale|GAIN:3
[21] T21|P0|STEAL:Passport|SKIP_NEXT
[22] T22|P1|PAY_FEE:3|TO:P0
[22] T22|P1|BUY:Subscribe to Travel Updates|FROM:P0|COST:2
[22] T22|P0|REV|S0:Payday
[23] T23|P0|SKIP_TURN
[24] T24|P1|SELL:Subscribe to Travel Updates|GAIN:2
[24] T24|P1|ACT:Philanthropy
[24] T24|P1|ACT:Philanthropy|DELTA:[1,-2]
[25] T25|P0|PAY_FEE:2|TO:P1
[25] T25|P0|BUY:Video Chat with Person from Destination|FROM:P1|COST:1
[25] T25|P1|REV|S3:Pay Cut
[26] T26|P1|ACT:Pay Cut
[26] T26|P1|ACT:Pay Cut|LOSS:1|KEEP
[27] T27|P0|ACT:Payday
[27] T27|PAYDAY|SALARIES:[1,1]
[28] T28|P1|ACT:Payday
[28] T28|PAYDAY|SALARIES:[1,1]
[28] T28|P1|REV|S2:Payday
[29] T29|P0|PAY_FEE:3|TO:P1
[29] T29|P0|BUY:Become World Famous|FROM:P1|COST:2
[29] T29|P1|REV|S0:Copy of Birth Certificate
[29] T29|P1|REV|S1:Background Check
[30] T30|P1|BUY:Copy of Birth Certificate|FROM:P1|COST:2
[31] T31|P0|ACT:Island Paradise
[31] T31|P0|ACT:Island Paradise|DELTA:[2,1]
[31] T31|P0|REV|S3:Payday
[32] T32|P1|BUY:Background Check|FROM:P1|COST:4
[33] T33|P0|ACT:Payday
[33] T33|PAYDAY|SALARIES:[1,1]
[34] T34|P1|ACT:Payday
[34] T34|PAYDAY|SALARIES:[1,1]
[35] T35|P0|ACT:Payday
[35] T35|PAYDAY|SALARIES:[1,1]
[35] T35|P0|REV|S1:Payday
[35] T35|P0|REV|S2:Learn Song from Your Destination
[36] T36|P1|PAY_FEE:4|TO:P0
[36] T36|P1|DISC:Learn Song from Your Destination|FROM:P0|GAIN:2
[37] T37|P0|ACT:Payday
[37] T37|PAYDAY|SALARIES:[1,1]
[37] PHASE2_START
[37] PHASE2|P0|TRADE|$7:+2A|3C:+5A|PEN_D:-2A|TOTAL_A:6
[37] PHASE2|P1|TRADE|TOTAL_A:2
[37] PHASE2|P0|SELECT_LANE:Lane 1|TKN:7
[37] PHASE2|P0|CROSS:FAIL_LOW_A
[37] PHASE2|P1|SELECT_LANE:Lane 1|TKN:7
[37] PHASE2|P1|CROSS:FAIL_MISSING_DOCS
[37] GAME_OVER|WINNER (no one crossed, most Money): Player 2 ($4)

GAME 5
[1] INIT|P0|NAT:Russian|DEST:Senegal|$5|FACEUP:[4:Payday,5:Mental Fog,6:Learn Song from Your Destination,11:Background Check,12:Payday,13:Checklist]
[1] INIT|P1|NAT:Senegalese|DEST:England|$3|FACEUP:[4:Pandemic / Economic Stimulus,5:Payday,6:Rummage Sale,11:Island Paradise,12:Payday,13:Stellar Reputation]
[1] INIT|P2|NAT:Congolese|DEST:France|$2|FACEUP:[4:Payday,5:Letter of Invitation,6:Politician Approves You,11:Language Phrasebook,12:Subscribe to Travel Updates,13:Reward]
[1] INIT|P3|NAT:French|DEST:Russia|$5|FACEUP:[4:Pandemic / Economic Stimulus,5:Network Fair,6:Blacklisted,11:Excellent Teamwork,12:Payday,13:Get Engaged to a Native]
[1] T1|P0|BUY:Checklist|FROM:P0|COST:2
[1] T1|P0|REV|S10:Video Chat with Person from Destination
[2] T2|P1|PAY_FEE:1|TO:P2
[2] T2|P1|BUY:Subscribe to Travel Updates|FROM:P2|COST:2
[3] T3|P2|PAY_FEE:1|TO:P0
[3] T3|P2|BUY:Video Chat with Person from Destination|FROM:P0|COST:2
[4] T4|P3|PAY_FEE:1|TO:P0
[4] T4|P3|BUY:Background Check|FROM:P0|COST:4
[4] T4|P0|REV|S7:Physical Exam
[5] T5|P0|PAY_FEE:1|TO:P3
[5] T5|P0|BUY:Excellent Teamwork|FROM:P3|COST:3
[5] T5|P3|REV|S7:Penalty
[6] T6|P1|SELL:Subscribe to Travel Updates|GAIN:2
[6] T6|ROLL_D6:6
[6] T6|P1|COLLEGE_APP|ROLL:6|TUITION:9|RES:FAIL
[6] T6|P1|ACT:Stellar Reputation
[6] T6|P1|KEEP:Stellar Reputation
[6] T6|P1|REV|S10:Copy of Birth Certificate
[7] T7|P2|SELL:Video Chat with Person from Destination|GAIN:2
[7] T7|ROLL_D6:2
[7] T7|P2|COLLEGE_APP|ROLL:2|TUITION:3|RES:FAIL
[7] T7|P2|ACT:Reward
[7] T7|P2|ACT:Reward|DELTA:[-1,-1,4,-1]
[7] T7|P2|REV|S9:Coffee with Airport Employee
[7] T7|P2|REV|S10:Swap Wallets
[8] T8|P3|SELL:Background Check|GAIN:2
[8] T8|P3|PAY_FEE:2|TO:P2
[8] T8|P3|DISC:Language Phrasebook|FROM:P2|GAIN:2
[8] T8|P2|REV|S7:Certificate of Excellence
[8] T8|P2|REV|S8:Underdog
[9] T9|P0|STEAL:Ticket|SKIP_NEXT
[10] T10|P1|ACT:Island Paradise
[10] T10|P1|ACT:Island Paradise|DELTA:[0,2,1,1]
[10] T10|P1|REV|S7:Payday
[11] T11|P2|BUY:Certificate of Excellence|FROM:P2|COST:2
[12] T12|ROLL_D6:2
[12] T12|P3|COLLEGE_APP|ROLL:2|TUITION:4|RES:FAIL
[12] T12|P3|ACT:Penalty
[12] T12|P3|ACT:Penalty|LOSS:1|KEEP
[13] T13|P0|SKIP_TURN
[14] T14|P1|BUY:Copy of Birth Certificate|FROM:P1|COST:2
[15] T15|P2|PAY_FEE:2|TO:P0
[15] T15|P2|BUY:Physical Exam|FROM:P0|COST:3
[16] T16|P3|ACT:Payday
[16] T16|PAYDAY|SALARIES:[1,1,1,1]
[16] T16|P3|REV|S8:Star Power
[17] T17|P0|BUY_POOL:Passport|COST:2
[17] T17|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[18] T18|P1|SELL:Copy of Birth Certificate|GAIN:2
[18] T18|P1|PAY_FEE:2|TO:P2
[18] T18|P1|BUY:Coffee with Airport Employee|FROM:P2|COST:1
[19] T19|P2|STEAL:Passport|SKIP_NEXT
[20] T20|P3|ACT:Star Power
[20] T20|P3|ACT:Star Power|GAIN:1|KEEP
[21] T21|P0|STEAL:Passport|SKIP_NEXT
[22] T22|P1|SELL:Coffee with Airport Employee|GAIN:2
[22] T22|P1|ACT:Payday
[22] T22|PAYDAY|SALARIES:[1,1,1,1]
[23] T23|P2|SKIP_TURN
[24] T24|P3|BUY:Get Engaged to a Native|FROM:P3|COST:4
[24] T24|P3|REV|S9:Become World Famous
[24] T24|P3|REV|S10:Travel Concierge
[25] T25|P0|SKIP_TURN
[26] T26|P1|ACT:Payday
[26] T26|PAYDAY|SALARIES:[1,1,1,1]
[26] T26|P1|REV|S8:Payday
[26] T26|P1|REV|S9:Payday
[27] T27|P2|PAY_FEE:3|TO:P3
[27] T27|P2|BUY:Become World Famous|FROM:P3|COST:3
[27] T27|P3|STAR_POWER|GAIN:1|PASS_TO:P2
[28] T28|P3|RECLAIM:Passport|FROM:P0|COST:5
[29] T29|P0|PAY_FEE:2|TO:P3
[29] T29|P0|BUY:Network Fair|FROM:P3|COST:3
[29] T29|P2|STAR_POWER|GAIN:1|PASS_TO:P0
[30] T30|P1|PAY_FEE:3|TO:P3
[30] T30|P1|DISC:Travel Concierge|FROM:P3|GAIN:2
[31] T31|P2|SELL:Certificate of Excellence|GAIN:2
[31] T31|P2|STEAL:Ticket|SKIP_NEXT
[31] T31|P2|TICKET_PASSPORT_BONUS|GAIN:1A
[32] T32|P3|STEAL:Ticket|SKIP_NEXT
[32] T32|P3|TICKET_PASSPORT_BONUS|GAIN:1A
[33] T33|P0|PAY_FEE:3|TO:P2
[33] T33|P0|ACT:Swap Wallets
[33] T33|P0|ACT:Swap Wallets|SWAP:P2
[34] T34|P1|ACT:Payday
[34] T34|PAYDAY|SALARIES:[1,1,1,1]
[35] T35|P2|SKIP_TURN
[36] T36|P3|SKIP_TURN
[37] ERR|NO_FUNDS_8
[37] T37|P0|PAY_FEE:4|TO:P1
[37] T37|P0|ACT:Payday
[37] T37|PAYDAY|SALARIES:[1,1,1,1]
[38] T38|P1|ACT:Payday
[38] T38|PAYDAY|SALARIES:[1,1,1,1]
[39] T39|P2|ACT:Underdog
[39] T39|P2|ACT:Underdog|LOSS:1|KEEP
[39] T39|P2|UNDERDOG|LOSS:1|PASS_TO:P1
[40] T40|P3|ACT:Blacklisted
[40] T40|P3|ACT:Blacklisted|LOSS:1|KEEP
[40] T40|P3|REV|S2:Payday
[40] T40|P3|REV|S3:Payday
[41] ERR|NO_FUNDS_9
[41] T41|P0|ACT:Payday
[41] T41|PAYDAY|SALARIES:[1,1,1,1]
[41] T41|P0|REV|S8:Internship in Your Destination
[41] T41|P0|REV|S9:Attend Security Training
[42] T42|P1|PAY_FEE:4|TO:P0
[42] T42|P1|BUY:Attend Security Training|FROM:P0|COST:3
[43] T43|P2|ACT:Payday
[43] T43|PAYDAY|SALARIES:[1,1,1,1]
[43] T43|P2|REV|S0:Vehicle Registration Papers
[44] T44|P3|BLACKLISTED|LOSS:1
[44] T44|P3|ACT:Pandemic / Economic Stimulus
[44] T44|ROLL_D6:5
[44] T44|P3|ACT:PANDEMIC_STIMULUS|DELTA:[-5,-5,-3,-5]
[44] T44|P3|REV|S0:Cookies for Neighbor from Destination
[44] T44|P3|REV|S1:Salvage
[45] T45|P0|BUY:Learn Song from Your Destination|FROM:P0|COST:2
[45] T45|P0|REV|S3:Frontrunner
[46] T46|P1|SELL:Attend Security Training|GAIN:2
[46] T46|P1|ACT:Pandemic / Economic Stimulus
[46] T46|ROLL_D6:4
[46] T46|P1|ACT:PANDEMIC_STIMULUS|DELTA:[4,4,4,4]
[46] T46|P1|REV|S0:Suspect
[46] T46|P1|REV|S1:Residence Address in Destination
[47] T47|P2|BUY:Vehicle Registration Papers|FROM:P2|COST:4
[48] T48|P3|BLACKLISTED|LOSS:1
[48] T48|P3|ACT:Salvage
[48] T48|P3|ACT:Salvage|GAIN:1|KEEP
[49] T49|P0|PAY_FEE:5|TO:P1
[49] T49|P0|BUY:Residence Address in Destination|FROM:P1|COST:3
[50] T50|P1|PAY_FEE:5|TO:P2
[50] T50|P1|BUY:Letter of Invitation|FROM:P2|COST:4
[50] T50|P2|REV|S1:Payday
[51] T51|Player 4 gains $1 from Salvage.
[51] T51|P2|ACT:Payday
[51] T51|PAYDAY|SALARIES:[1,1,1,1]
[52] T52|P3|BLACKLISTED|LOSS:1
[52] T52|P3|ACT:Payday
[52] T52|PAYDAY|SALARIES:[1,1,1,1]
[53] T53|P0|STEAL:Ticket|SKIP_NEXT
[54] T54|P1|STEAL:Passport|SKIP_NEXT
[55] T55|P2|PAY_FEE:4|TO:P3
[55] T55|P2|DISC:Cookies for Neighbor from Destination|FROM:P3|GAIN:2
[55] T55|Player 4 gains $1 from Salvage.
[56] T56|P3|BLACKLISTED|LOSS:1
[56] T56|P3|ACT:Payday
[56] T56|PAYDAY|SALARIES:[1,1,1,1]
[57] T57|P0|SKIP_TURN
[58] T58|P1|SKIP_TURN
[59] T59|P2|PAY_FEE:5|TO:P0
[59] T59|P2|DISC:Internship in Your Destination|FROM:P0|GAIN:2
[59] T59|Player 4 gains $1 from Salvage.
[60] T60|P3|PAY_FEE:4|TO:P2
[60] T60|P3|DISC:Politician Approves You|FROM:P2|GAIN:2
[60] T60|P3|BLACKLISTED|LOSS:1
[60] T60|P2|REV|S2:Insider
[60] T60|P2|REV|S3:Vaccination Record
[61] T61|Player 4 gains $1 from Salvage.
[61] T61|P0|ACT:Mental Fog
[61] T61|P0|ACT:Mental Fog|LOSS:1
[61] T61|P0|ACT:Mental Fog|DISC_STASH:Salvage|FROM:P3
[61] T61|P0|REV|S2:Support Group Motivates You
[62] T62|P1|ACT:Suspect
[62] T62|P1|ACT:Suspect|LOSS:1
[62] T62|P1|ACT:Suspect|DISC:Letter of Invitation
[63] T63|P2|ACT:Insider
[63] T63|P2|KEEP:Insider
[64] T64|P3|PAY_FEE:5|TO:P2
[64] T64|P3|BUY:Vaccination Record|FROM:P2|COST:3
[64] T64|P3|PASS_PENALTY|TO:P2
[65] T65|P0|ACT:Frontrunner
[65] T65|P0|ACT:Frontrunner|MONEY_PLACED:1|KEEP
[66] T66|P1|ACT:Rummage Sale
[66] T66|P1|ACT:Rummage Sale|GAIN:3
[66] T66|P1|REV|S2:Payday
[66] T66|P1|REV|S3:Payday
[67] T67|P2|PAY_FEE:5|TO:P0
[67] T67|P2|DISC:Support Group Motivates You|FROM:P0|GAIN:2
[68] T68|ROLL_D6:3
[68] T68|P3|COLLEGE_APP|ROLL:3|TUITION:5|RES:PASS
[69] T69|ROLL_D6:5
[69] T69|P0|COLLEGE_APP|ROLL:5|TUITION:10|RES:PASS
[70] T70|P1|RECLAIM:Ticket|FROM:P0|COST:7
[70] T70|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[71] T71|ROLL_D6:1
[71] T71|P2|COLLEGE_APP|ROLL:1|TUITION:2|RES:PASS
[72] T72|P3|FORFEIT|CONS:1
[73] T73|ROLL_D6:4
[73] T73|P0|GRAD|ROLL:4|RES:FAIL
[73] T73|P0|ACT:Payday
[73] T73|PAYDAY|SALARIES:[0,1,0,0]
[73] T73|P0|FRONTRUNNER_ADD:1|TOTAL:2
[73] T73|P0|FRONTRUNNER_PASS|TO:P3
[73] T73|P3|FRONTRUNNER_ADD:1|TOTAL:3
[73] T73|P3|FRONTRUNNER_PASS|TO:P2
[73] T73|P0|REV|S0:Payday
[73] T73|P0|REV|S1:International Driving Permit
[74] T74|P1|ACT:Payday
[74] T74|PAYDAY|SALARIES:[0,1,0,0]
[74] T74|P2|FRONTRUNNER_ADD:1|TOTAL:4
[74] T74|P2|FRONTRUNNER_PASS|TO:P1
[75] T75|ROLL_D6:2
[75] T75|P2|GRAD|ROLL:2|RES:PASS|SALARY_INC:1
[75] T75|P2|PAY_FEE:5|TO:P0
[75] T75|P2|DISC:International Driving Permit|FROM:P0|GAIN:2
[76] T76|P3|FORFEIT|CONS:1
[77] T77|ROLL_D6:2
[77] T77|P0|GRAD|ROLL:2|RES:PASS|SALARY_INC:1
[77] T77|P0|ACT:Payday
[77] T77|PAYDAY|SALARIES:[2,1,3,0]
[77] T77|P1|FRONTRUNNER_ADD:1|TOTAL:5
[77] T77|P1|FRONTRUNNER_PASS|TO:P0
[78] T78|P1|ACT:Payday
[78] T78|PAYDAY|SALARIES:[2,1,3,0]
[78] T78|P0|FRONTRUNNER_PASS|TO:P3
[78] T78|P3|FRONTRUNNER_PASS|TO:P2
[78] PHASE2_START
[78] PHASE2|P0|TRADE|$14:+4A|3C:+5A|TOTAL_A:12
[78] PHASE2|P1|TRADE|PEN_D:-3A|TOTAL_A:-2
[78] PHASE2|P2|TRADE|$8:+2A|TOTAL_A:5
[78] PHASE2|P3|TRADE|PEN_M:-1A|PEN_D:-3A|TOTAL_A:-3
[78] PHASE2|P0|SELECT_LANE:Lane 4|TKN:9
[78] PHASE2|P0|CROSS:PASS|PAID_A:9|REM_A:3
[78] PHASE2|P1|SELECT_LANE:Lane 4|TKN:8
[78] PHASE2|P1|CROSS:FAIL_LOW_A
[78] PHASE2|P2|SELECT_LANE:Lane 4|TKN:4
[78] PHASE2|P2|CROSS:PASS|PAID_A:4|REM_A:1
[78] PHASE2|P3|SELECT_LANE:Lane 1|TKN:6
[78] PHASE2|P3|CROSS:FAIL_LOW_A
[78] GAME_OVER|WINNER: Player 1 (Assurance: 3, Money: $4)
