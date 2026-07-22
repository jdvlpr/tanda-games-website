[1] INIT|P0|NAT:Bosnian|DEST:China|$2|FACEUP:[4:Vaccination Record,5:Personality Test,6:Favorable Cultural Opinion,11:Payday,12:Insider,13:Copy of Birth Certificate]
[1] INIT|P1|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Payday,5:Excellent Teamwork,6:Stellar Reputation,11:Underdog,12:Physical Exam,13:Language Classes]
[1] INIT|P2|NAT:Congolese|DEST:France|$2|FACEUP:[4:Payday,5:Pandemic / Economic Stimulus,6:Pandemic / Economic Stimulus,11:Travel Wallet,12:Payday,13:Attend Security Training]
[1] INIT|P3|NAT:French|DEST:Russia|$5|FACEUP:[4:Swap Wallets,5:Payday,6:Payday,11:Payday,12:Learn from an Elder,13:Rummage Sale]
[1] T1|P0|ACT:Insider
[1] T1|P0|KEEP:Insider
[2] T2|P1|BUY:Language Classes|FROM:P1|COST:3
[2] T2|P1|REV|S10:Payday
[3] T3|P2|PAY_FEE:1|TO:P0
[3] T3|P2|DISC:Copy of Birth Certificate|FROM:P0|GAIN:2
[3] T3|P0|REV|S9:Payday
[3] T3|P0|REV|S10:Star Power
[4] T4|P3|BUY:Learn from an Elder|FROM:P3|COST:3
[5] T5|P0|ACT:Payday
[5] T5|PAYDAY|SALARIES:[2,1,1,1]
[5] T5|P0|REV|S7:Politician Approves You
[5] T5|P0|REV|S8:Payday
[6] T6|P1|BUY:Physical Exam|FROM:P1|COST:3
[6] T6|P1|REV|S9:Payday
[7] T7|P2|BUY:Attend Security Training|FROM:P2|COST:3
[7] T7|P2|REV|S10:Subscribe to Travel Updates
[8] T8|P3|PAY_FEE:1|TO:P2
[8] T8|P3|BUY:Subscribe to Travel Updates|FROM:P2|COST:2
[9] T9|ROLL_D6:2
[9] T9|P0|COLLEGE_APP|ROLL:2|TUITION:3|RES:PASS
[10] T10|P1|STEAL:Ticket|SKIP_NEXT
[11] T11|P2|SELL:Attend Security Training|GAIN:2
[11] T11|P2|BUY:Travel Wallet|FROM:P2|COST:3
[11] T11|P2|REV|S7:Payday
[12] T12|P3|STEAL:Ticket|SKIP_NEXT
[13] T13|ROLL_D6:4
[13] T13|P0|GRAD|ROLL:4|RES:FAIL
[13] T13|P0|ACT:Payday
[13] T13|PAYDAY|SALARIES:[0,1,1,1]
[14] T14|P1|SKIP_TURN
[15] T15|P2|STEAL:Passport|SKIP_NEXT
[16] T16|P3|SKIP_TURN
[17] T17|ROLL_D6:4
[17] T17|P0|GRAD|ROLL:4|RES:FAIL
[17] T17|P0|DISC:Politician Approves You|FROM:P0|GAIN:2
[18] T18|P1|STEAL:Passport|SKIP_NEXT
[18] T18|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[19] T19|P2|SKIP_TURN
[20] T20|P3|STEAL:Passport|SKIP_NEXT
[20] T20|P3|TICKET_PASSPORT_BONUS|GAIN:1A
[21] T21|P0|ACT:Star Power
[21] T21|P0|ACT:Star Power|GAIN:1|KEEP
[22] T22|P1|SKIP_TURN
[23] T23|P2|ACT:Payday
[23] T23|PAYDAY|SALARIES:[0,1,1,1]
[23] T23|P2|REV|S8:Employment Contract
[23] T23|P2|REV|S9:Write Last Will and Testament
[24] T24|P3|SKIP_TURN
[25] T25|ROLL_D6:2
[25] T25|P0|GRAD|ROLL:2|RES:PASS|SALARY_INC:1
[25] T25|P0|ACT:Payday
[25] T25|PAYDAY|SALARIES:[3,1,1,1]
[26] T26|P1|PAY_FEE:1|TO:P0
[26] T26|P1|DISC:Favorable Cultural Opinion|FROM:P0|GAIN:2
[26] T26|P0|REV|S3:Dinner with a Diplomat
[27] T27|P2|PAY_FEE:2|TO:P0
[27] T27|P2|DISC:Dinner with a Diplomat|FROM:P0|GAIN:2
[28] T28|P3|PAY_FEE:2|TO:P0
[28] T28|P3|DISC:Vaccination Record|FROM:P0|GAIN:2
[28] T28|P0|REV|S0:Cookies for Neighbor from Destination
[29] T29|P0|BUY:Personality Test|FROM:P0|COST:3
[29] T29|P0|REV|S1:Notebook
[29] T29|P0|REV|S2:Salvage
[30] T30|P1|PAY_FEE:2|TO:P0
[30] T30|P1|DISC:Cookies for Neighbor from Destination|FROM:P0|GAIN:2
[31] T31|P2|PAY_FEE:3|TO:P0
[31] T31|P2|DISC:Notebook|FROM:P0|GAIN:2
[32] T32|P3|ACT:Rummage Sale
[32] T32|P3|ACT:Rummage Sale|GAIN:3
[32] T32|P3|REV|S9:Payday
[32] T32|P3|REV|S10:Coffee with Airport Employee
[33] T33|P0|ACT:Salvage
[33] T33|P0|ACT:Salvage|GAIN:1|KEEP
[34] T34|Player 1 gains $1 from Salvage.
[34] T34|P1|ACT:Underdog
[34] T34|P1|ACT:Underdog|LOSS:1|KEEP
[34] T34|P1|UNDERDOG|LOSS:1|PASS_TO:P0
[34] T34|P1|REV|S7:Friend moves to your Destination
[34] T34|P1|REV|S8:Checklist
[35] T35|Player 1 gains $1 from Salvage.
[35] T35|P2|ACT:Payday
[35] T35|PAYDAY|SALARIES:[2,1,1,1]
[36] T36|Player 1 gains $1 from Salvage.
[36] T36|P3|ACT:Payday
[36] T36|PAYDAY|SALARIES:[2,1,1,1]
[36] T36|P3|REV|S7:Suspect
[36] T36|P3|REV|S8:Island Paradise
[37] T37|P0|PAY_FEE:1|TO:P1
[37] T37|P0|BUY:Checklist|FROM:P1|COST:2
[38] T38|P1|BUY:Friend moves to your Destination|FROM:P1|COST:2
[38] T38|P0|STAR_POWER|GAIN:1|PASS_TO:P1
[39] T39|P2|BUY:Write Last Will and Testament|FROM:P2|COST:2
[40] T40|Player 1 gains $1 from Salvage.
[40] T40|P3|ACT:Suspect
[40] T40|P3|ACT:Suspect|LOSS:1
[40] T40|P3|ACT:Suspect|DISC:Learn from an Elder
[40] T40|Player 1 gains $1 from Salvage.
[41] T41|P0|PAY_FEE:2|TO:P2
[41] T41|P0|BUY:Employment Contract|FROM:P2|COST:4
[42] T42|Player 1 gains $1 from Salvage.
[42] T42|P1|ACT:Payday
[42] T42|PAYDAY|SALARIES:[2,1,1,1]
[43] T43|P2|PAY_FEE:4|TO:P3
[43] T43|P2|BUY:Coffee with Airport Employee|FROM:P3|COST:2
[43] T43|P1|STAR_POWER|GAIN:1|PASS_TO:P2
[44] T44|Player 1 gains $1 from Salvage.
[44] T44|P3|ACT:Island Paradise
[44] T44|P3|ACT:Island Paradise|DELTA:[0,1,0,2]
[45] T45|ROLL_D6:4
[45] T45|P0|COLLEGE_APP|ROLL:4|TUITION:6|RES:PASS
[46] T46|P1|BUY:Excellent Teamwork|FROM:P1|COST:3
[46] T46|P2|STAR_POWER|GAIN:1|PASS_TO:P1
[47] T47|P2|STEAL:Ticket|SKIP_NEXT
[47] T47|P2|TICKET_PASSPORT_BONUS|GAIN:1A
[48] T48|Player 1 gains $1 from Salvage.
[48] T48|P3|ACT:Swap Wallets
[48] T48|P3|ACT:Swap Wallets|SWAP:P0
[48] T48|P3|REV|S0:Penalty
[49] T49|ROLL_D6:3
[49] T49|P0|GRAD|ROLL:3|RES:PASS|SALARY_INC:3
[49] T49|P0|STEAL:Passport|SKIP_NEXT
[50] T50|Player 1 gains $1 from Salvage.
[50] T50|P1|ACT:Payday
[50] T50|PAYDAY|SALARIES:[2,1,1,1]
[51] T51|P2|SKIP_TURN
[52] T52|Player 1 gains $1 from Salvage.
[52] T52|P3|ACT:Penalty
[52] T52|P3|ACT:Penalty|LOSS:1|KEEP
[53] T53|P0|SKIP_TURN
[54] T54|Player 1 gains $1 from Salvage.
[54] T54|P1|ACT:Stellar Reputation
[54] T54|P1|KEEP:Stellar Reputation
[54] T54|P1|REV|S2:Reward
[54] T54|P1|REV|S3:Frontrunner
[55] T55|Player 1 gains $1 from Salvage.
[55] T55|P2|ACT:Payday
[55] T55|PAYDAY|SALARIES:[2,1,1,1]
[55] T55|P2|REV|S0:Get Engaged to a Native
[56] T56|P3|PAY_FEE:3|TO:P2
[56] T56|P3|DISC:Get Engaged to a Native|FROM:P2|GAIN:2
[56] T56|Player 1 gains $1 from Salvage.
[57] T57|P0|PAY_FEE:3|TO:P1
[57] T57|P0|ACT:Reward
[57] T57|P0|ACT:Reward|DELTA:[4,-1,-1,-1]
[58] T58|Player 1 gains $1 from Salvage.
[58] T58|P1|ACT:Frontrunner
[58] T58|P1|ACT:Frontrunner|MONEY_PLACED:1|KEEP
[59] T59|Player 1 gains $1 from Salvage.
[59] T59|P2|ACT:Pandemic / Economic Stimulus
[59] T59|ROLL_D6:4
[59] T59|P2|ACT:PANDEMIC_STIMULUS|DELTA:[-4,-4,-4,-4]
[59] T59|P2|REV|S3:Payday
[60] T60|Player 1 gains $1 from Salvage.
[60] T60|P3|ACT:Payday
[60] T60|PAYDAY|SALARIES:[2,1,1,1]
[60] T60|P1|FRONTRUNNER_ADD:1|TOTAL:2
[60] T60|P1|FRONTRUNNER_PASS|TO:P0
[61] T61|P0|PAY_FEE:4|TO:P3
[61] T61|P0|ACT:Payday
[61] T61|PAYDAY|SALARIES:[6,1,1,1]
[61] T61|P0|FRONTRUNNER_ADD:1|TOTAL:3
[61] T61|P0|FRONTRUNNER_PASS|TO:P3
[61] T61|P3|FRONTRUNNER_ADD:1|TOTAL:4
[61] T61|P3|FRONTRUNNER_PASS|TO:P2
[61] T61|P3|REV|S3:Payday
[62] T62|Player 1 gains $1 from Salvage.
[62] T62|P1|ACT:Payday
[62] T62|PAYDAY|SALARIES:[2,1,1,1]
[62] T62|P2|FRONTRUNNER_ADD:1|TOTAL:5
[62] T62|P2|FRONTRUNNER_PASS|TO:P1
[62] T62|P1|REV|S0:Mental Fog
[62] T62|P1|REV|S1:Vehicle Registration Papers
[63] T63|Player 1 gains $1 from Salvage.
[63] T63|P2|ACT:Pandemic / Economic Stimulus
[63] T63|ROLL_D6:1
[63] T63|P2|ACT:PANDEMIC_STIMULUS|DELTA:[1,1,1,1]
[63] T63|P2|REV|S1:Certificate of Excellence
[63] T63|P2|REV|S2:Attend History Class
[64] T64|P3|PAY_FEE:4|TO:P2
[64] T64|P3|DISC:Attend History Class|FROM:P2|GAIN:2
[64] T64|Player 1 gains $1 from Salvage.
[65] T65|P0|PAY_FEE:5|TO:P2
[65] T65|P0|BUY:Certificate of Excellence|FROM:P2|COST:2
[66] T66|Player 1 gains $1 from Salvage.
[66] T66|P1|ACT:Mental Fog
[66] T66|P1|ACT:Mental Fog|LOSS:1
[67] T67|Player 1 gains $1 from Salvage.
[67] T67|P2|ACT:Payday
[67] T67|PAYDAY|SALARIES:[2,1,1,1]
[67] T67|P1|FRONTRUNNER_PASS|TO:P0
[68] T68|Player 1 gains $1 from Salvage.
[68] T68|P3|ACT:Payday
[68] T68|PAYDAY|SALARIES:[2,1,1,1]
[68] T68|P0|FRONTRUNNER_PASS|TO:P3
[68] T68|P3|FRONTRUNNER_PASS|TO:P2
[69] T69|P0|PAY_FEE:5|TO:P1
[69] T69|P0|DISC:Vehicle Registration Papers|FROM:P1|GAIN:2
[70] T70|ROLL_D6:5
[70] T70|P1|COLLEGE_APP|ROLL:5|TUITION:11|RES:PASS
[71] T71|ROLL_D6:5
[71] T71|P2|COLLEGE_APP|ROLL:5|TUITION:7|RES:PASS
[72] T72|Player 1 gains $1 from Salvage.
[72] T72|P3|ACT:Payday
[72] T72|PAYDAY|SALARIES:[2,0,0,1]
[72] T72|P2|FRONTRUNNER_PASS|TO:P1
[72] T72|P3|REV|S1:Support Group Motivates You
[72] T72|P3|REV|S2:Payday
[73] T73|P0|PAY_FEE:5|TO:P3
[73] T73|P0|BUY:Support Group Motivates You|FROM:P3|COST:2
[73] T73|P1|STAR_POWER|GAIN:1|PASS_TO:P0
[74] T74|ROLL_D6:3
[74] T74|P1|GRAD|ROLL:3|RES:PASS|SALARY_INC:1
[74] T74|ROLL_D6:1
[74] T74|P1|COLLEGE_APP|ROLL:1|TUITION:4|RES:PASS
[75] T75|ROLL_D6:2
[75] T75|P2|GRAD|ROLL:2|RES:PASS|SALARY_INC:1
[75] T75|ROLL_D6:6
[75] T75|P2|COLLEGE_APP|ROLL:6|TUITION:8|RES:PASS
[76] T76|Player 1 gains $1 from Salvage.
[76] T76|P3|ACT:Payday
[76] T76|PAYDAY|SALARIES:[2,0,0,1]
[76] T76|P1|FRONTRUNNER_PASS|TO:P0
[76] PHASE2_START
[76] PHASE2|P0|TRADE|$30:+9A|4D:+2A|TOTAL_A:15
[76] T76|Player 1 gains $1 from Salvage.
[76] T76|Player 1 gains $1 from Salvage.
[76] T76|Player 1 gains $1 from Salvage.
[76] PHASE2|P1|TRADE|3C:+6A|PEN_D:-2A|TOTAL_A:7
[76] PHASE2|P2|TRADE|PEN_M:-1A|TOTAL_A:2
[76] PHASE2|P3|TRADE|$21:+6A|PEN_D:-3A|TOTAL_A:4
[76] PHASE2|P0|SELECT_LANE:Lane 5|TKN:3
[76] PHASE2|P0|CROSS:FAIL_MISSING_DOCS
[76] PHASE2|P1|SELECT_LANE:Lane 1|TKN:6
[76] PHASE2|P1|CROSS:PASS|PAID_A:6|REM_A:1
[76] PHASE2|P2|SELECT_LANE:Lane 1|TKN:7
[76] PHASE2|P2|CROSS:FAIL_LOW_A
[76] PHASE2|P3|SELECT_LANE:Lane 4|TKN:9
[76] PHASE2|P3|CROSS:FAIL_LOW_A
[76] GAME_OVER|WINNER: Player 2 (Assurance: 1, Money: $0)

[1] INIT|P0|NAT:Bosnian|DEST:China|$2|FACEUP:[4:FOMO,5:Reward,6:Letter of Invitation,11:Payday,12:Payday,13:Travel Wallet]
[1] INIT|P1|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Blacklisted,5:Trousers Fall Down,6:Employment Contract,11:Payday,12:Cookies for Neighbor from Destination,13:VIP]
[1] INIT|P2|NAT:Congolese|DEST:France|$2|FACEUP:[4:Life Coach,5:Physical Exam,6:Travel Brochure,11:Notebook,12:Salvage,13:Payday]
[1] INIT|P3|NAT:French|DEST:Russia|$5|FACEUP:[4:Learn from an Elder,5:Support Group Motivates You,6:Lost & Found,11:Payday,12:Pandemic / Economic Stimulus,13:Network Fair]
[1] INIT|P4|NAT:Russian|DEST:Senegal|$5|FACEUP:[4:Payday,5:Payday,6:Subscribe to Travel Updates,11:Payday,12:Certificate of Excellence,13:International Driving Permit]
[1] INIT|P5|NAT:Senegalese|DEST:Switzerland|$3|FACEUP:[4:Payday,5:Language Classes,6:Learn Song from Your Destination,11:Copy of Birth Certificate,12:Enter Luxury Travel Club,13:Keep Calm]
[1] T1|P0|ACT:Payday
[1] T1|PAYDAY|SALARIES:[1,1,1,1,1,1]
[2] T2|P1|BUY:Cookies for Neighbor from Destination|FROM:P1|COST:2
[3] T3|P2|BUY:Notebook|FROM:P2|COST:2
[3] T3|P2|REV|S7:Payday
[4] T4|P3|PAY_FEE:1|TO:P5
[4] T4|P3|BUY:Copy of Birth Certificate|FROM:P5|COST:2
[4] T4|P5|REV|S7:Payday
[5] T5|P4|BUY:Certificate of Excellence|FROM:P4|COST:2
[6] T6|P5|PAY_FEE:1|TO:P0
[6] T6|P5|BUY:Travel Wallet|FROM:P0|COST:3
[6] T6|P0|REV|S9:Philanthropy
[6] T6|P0|REV|S10:Payday
[7] T7|ROLL_D6:4
[7] T7|P0|COLLEGE_APP|ROLL:4|TUITION:6|RES:FAIL
[7] T7|P0|ACT:Payday
[7] T7|PAYDAY|SALARIES:[1,1,1,1,1,1]
[7] T7|P0|REV|S7:Excellent Teamwork
[7] T7|P0|REV|S8:Residence Address in Destination
[8] T8|P1|PAY_FEE:1|TO:P0
[8] T8|P1|BUY:Residence Address in Destination|FROM:P0|COST:3
[9] T9|P2|STEAL:Passport|SKIP_NEXT
[10] T10|P3|BUY:Network Fair|FROM:P3|COST:3
[10] T10|P3|REV|S10:Fancy Clothes
[11] T11|P4|PAY_FEE:1|TO:P0
[11] T11|P4|BUY:Excellent Teamwork|FROM:P0|COST:3
[12] T12|P5|STEAL:Passport|SKIP_NEXT
[13] T13|P0|PAY_FEE:1|TO:P4
[13] T13|P0|BUY:International Driving Permit|FROM:P4|COST:4
[13] T13|P4|REV|S9:Payday
[13] T13|P4|REV|S10:Internship in Your Destination
[14] T14|P1|STEAL:Ticket|SKIP_NEXT
[15] T15|P2|SKIP_TURN
[16] T16|P3|STEAL:Ticket|SKIP_NEXT
[17] T17|P4|SELL:Excellent Teamwork|GAIN:2
[17] T17|P4|BUY:Internship in Your Destination|FROM:P4|COST:4
[18] T18|P5|SKIP_TURN
[19] T19|P0|STEAL:Passport|SKIP_NEXT
[20] T20|P1|SKIP_TURN
[21] T21|P2|PAY_FEE:1|TO:P5
[21] T21|P2|DISC:Enter Luxury Travel Club|FROM:P5|GAIN:2
[21] T21|P5|REV|S8:Share
[22] T22|P3|SKIP_TURN
[23] T23|P4|STEAL:Ticket|SKIP_NEXT
[24] T24|ROLL_D6:2
[24] T24|P5|COLLEGE_APP|ROLL:2|TUITION:3|RES:PASS
[25] T25|P0|SKIP_TURN
[26] T26|P1|STEAL:Passport|SKIP_NEXT
[26] T26|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[27] T27|ROLL_D6:3
[27] T27|P2|COLLEGE_APP|ROLL:3|TUITION:4|RES:FAIL
[27] T27|P2|ACT:Payday
[27] T27|PAYDAY|SALARIES:[1,1,1,1,1,0]
[27] T27|P2|REV|S10:Pet Passport
[28] T28|P3|STEAL:Passport|SKIP_NEXT
[28] T28|P3|TICKET_PASSPORT_BONUS|GAIN:1A
[29] T29|P4|SKIP_TURN
[30] T30|ROLL_D6:6
[30] T30|P5|GRAD|ROLL:6|RES:FAIL
[30] T30|ROLL_D6:4
[30] T30|P5|GRAD|ROLL:4|RES:FAIL
[30] T30|P5|ACT:Payday
[30] T30|PAYDAY|SALARIES:[1,1,1,1,1,0]
[31] T31|P0|ACT:Payday
[31] T31|PAYDAY|SALARIES:[1,1,1,1,1,0]
[32] T32|P1|SKIP_TURN
[33] T33|P2|ACT:Salvage
[33] T33|P2|ACT:Salvage|GAIN:1|KEEP
[33] T33|P2|REV|S8:Listen to the News
[33] T33|P2|REV|S9:Social Butterfly
[34] T34|P3|SKIP_TURN
[35] T35|P4|STEAL:Passport|SKIP_NEXT
[35] T35|P4|TICKET_PASSPORT_BONUS|GAIN:1A
[36] T36|ROLL_D6:2
[36] T36|P5|GRAD|ROLL:2|RES:PASS|SALARY_INC:1
[36] T36|Player 3 gains $1 from Salvage.
[36] T36|P5|ACT:Keep Calm
[36] T36|P5|ACT:Keep Calm|GAIN:1|KEEP
[36] T36|P5|REV|S9:Endorsement from Royalty
[36] T36|P5|REV|S10:Payday
[37] T37|P0|PAY_FEE:2|TO:P5
[37] T37|P0|DISC:Endorsement from Royalty|FROM:P5|GAIN:2
[37] T37|Player 3 gains $1 from Salvage.
[38] T38|P1|PAY_FEE:2|TO:P2
[38] T38|P1|DISC:Pet Passport|FROM:P2|GAIN:2
[38] T38|Player 3 gains $1 from Salvage.
[39] T39|P2|BUY:Listen to the News|FROM:P2|COST:2
[40] T40|Player 3 gains $1 from Salvage.
[40] T40|P3|ACT:Pandemic / Economic Stimulus
[40] T40|ROLL_D6:2
[40] T40|P3|ACT:PANDEMIC_STIMULUS|DELTA:[-2,-2,-2,-2,-2,-2]
[40] T40|P3|REV|S9:Payday
[41] T41|P4|SKIP_TURN
[42] T42|Player 3 gains $1 from Salvage.
[42] T42|P5|ACT:Payday
[42] T42|PAYDAY|SALARIES:[1,1,1,1,1,2]
[43] T43|Player 3 gains $1 from Salvage.
[43] T43|P0|ACT:FOMO
[43] T43|P0|ACT:FOMO|LOSS:1
[43] T43|P0|REV|S0:Checklist
[44] T44|Player 3 gains $1 from Salvage.
[44] T44|P1|ACT:VIP
[44] T44|P1|ACT:VIP|GAIN:6
[44] T44|P1|REV|S9:Pandemic / Economic Stimulus
[44] T44|P1|REV|S10:Payday
[45] T45|P2|SELL:Listen to the News|GAIN:2
[45] T45|P2|PAY_FEE:2|TO:P5
[45] T45|P2|BUY:Learn Song from Your Destination|FROM:P5|COST:2
[45] T45|P5|REV|S3:Payday
[46] T46|P3|PAY_FEE:2|TO:P0
[46] T46|P3|DISC:Checklist|FROM:P0|GAIN:2
[46] T46|Player 3 gains $1 from Salvage.
[47] T47|Player 3 gains $1 from Salvage.
[47] T47|P4|ACT:Payday
[47] T47|PAYDAY|SALARIES:[1,1,1,1,1,1]
[47] T47|P4|REV|S7:Payday
[47] T47|P4|REV|S8:Mental Fog
[48] T48|Player 3 gains $1 from Salvage.
[48] T48|P5|ACT:Payday
[48] T48|PAYDAY|SALARIES:[1,1,1,1,1,2]
[49] T49|Player 3 gains $1 from Salvage.
[49] T49|P0|ACT:Philanthropy
[49] T49|P0|ACT:Philanthropy|DELTA:[-6,1,1,1,1,1]
[50] T50|P1|PAY_FEE:3|TO:P0
[50] T50|P1|DISC:Letter of Invitation|FROM:P0|GAIN:2
[50] T50|Player 3 gains $1 from Salvage.
[50] T50|P0|REV|S3:Travel Concierge
[51] T51|P2|STEAL:Ticket|SKIP_NEXT
[51] T51|P2|TICKET_PASSPORT_BONUS|GAIN:1A
[52] T52|P3|PAY_FEE:3|TO:P0
[52] T52|P3|DISC:Travel Concierge|FROM:P0|GAIN:2
[52] T52|Player 3 gains $1 from Salvage.
[53] T53|Player 3 gains $1 from Salvage.
[53] T53|P4|ACT:Mental Fog
[53] T53|P4|ACT:Mental Fog|LOSS:1
[54] T54|Player 3 gains $1 from Salvage.
[54] T54|P5|ACT:Share
[54] T54|P5|ACT:Share|DELTA:[1,1,1,1,0,-4]
[55] T55|P0|PAY_FEE:3|TO:P5
[55] T55|P0|DISC:Language Classes|FROM:P5|GAIN:2
[55] T55|Player 3 gains $1 from Salvage.
[55] T55|P5|REV|S2:Attend History Class
[56] T56|Player 3 gains $1 from Salvage.
[56] T56|P1|ACT:Pandemic / Economic Stimulus
[56] T56|ROLL_D6:5
[56] T56|P1|ACT:PANDEMIC_STIMULUS|DELTA:[5,5,5,5,5,5]
[57] T57|P2|SKIP_TURN
[58] T58|P3|PAY_FEE:4|TO:P5
[58] T58|P3|DISC:Attend History Class|FROM:P5|GAIN:2
[58] T58|Player 3 gains $1 from Salvage.
[59] T59|Player 3 gains $1 from Salvage.
[59] T59|P4|ACT:Payday
[59] T59|PAYDAY|SALARIES:[1,1,1,1,1,1]
[60] T60|Player 3 gains $1 from Salvage.
[60] T60|P5|ACT:Payday
[60] T60|PAYDAY|SALARIES:[1,1,1,1,1,2]
[60] T60|P5|REV|S0:Personality Test
[60] T60|P5|REV|S1:Payday
[61] T61|P0|PAY_FEE:4|TO:P5
[61] T61|P0|DISC:Personality Test|FROM:P5|GAIN:2
[61] T61|Player 3 gains $1 from Salvage.
[62] T62|Player 3 gains $1 from Salvage.
[62] T62|P1|ACT:Payday
[62] T62|PAYDAY|SALARIES:[1,1,1,1,1,1]
[62] T62|P1|REV|S7:Nostalgia
[62] T62|P1|REV|S8:Suspect
[63] T63|P2|ACT:Social Butterfly
[63] T63|P2|ACT:Social Butterfly|TAKE:MONEY:3|FROM:P0
[64] T64|Player 3 gains $1 from Salvage.
[64] T64|P3|ACT:Fancy Clothes
[64] T64|P3|KEEP:Fancy Clothes
[65] T65|P4|PAY_FEE:2|TO:P2
[65] T65|P4|DISC:Travel Brochure|FROM:P2|GAIN:2
[65] T65|Player 3 gains $1 from Salvage.
[65] T65|P2|REV|S3:Payday
[66] T66|Player 3 gains $1 from Salvage.
[66] T66|P5|ACT:Payday
[66] T66|PAYDAY|SALARIES:[1,1,1,1,1,2]
[67] T67|Player 3 gains $1 from Salvage.
[67] T67|P0|ACT:Reward
[67] T67|P0|ACT:Reward|DELTA:[6,-1,-1,-1,-1,-1]
[67] T67|P0|REV|S1:Identical Twin
[67] T67|P0|REV|S2:Attend Security Training
[68] T68|P1|PAY_FEE:4|TO:P0
[68] T68|P1|DISC:Attend Security Training|FROM:P0|GAIN:2
[68] T68|Player 3 gains $1 from Salvage.
[69] T69|P2|BUY:Physical Exam|FROM:P2|COST:3
[69] T69|P2|REV|S2:Become World Famous
[70] T70|Player 3 gains $1 from Salvage.
[70] T70|P3|ACT:Payday
[70] T70|PAYDAY|SALARIES:[1,1,1,1,1,1]
[71] T71|P4|BUY:Subscribe to Travel Updates|FROM:P4|COST:2
[71] T71|P4|REV|S3:Payday
[72] T72|P5|PAY_FEE:2|TO:P2
[72] T72|P5|BUY:Become World Famous|FROM:P2|COST:3
[73] T73|Player 3 gains $1 from Salvage.
[73] T73|P0|ACT:Identical Twin
[73] T73|P0|ACT:Identical Twin|GAIN:1|EXTRA_TURN
[73] T73|P0|PAY_FEE:5|TO:P1
[73] T73|Player 3 gains $1 from Salvage.
[73] T73|P0|ACT:Suspect
[73] T73|P0|ACT:Suspect|LOSS:1
[73] T73|P0|ACT:Suspect|DISC:International Driving Permit
[73] T73|Player 3 gains $1 from Salvage.
[74] T74|Player 3 gains $1 from Salvage.
[74] T74|P1|ACT:Nostalgia
[74] T74|P1|ACT:Nostalgia|GAIN:2
[75] T75|P2|ACT:Payday
[75] T75|PAYDAY|SALARIES:[1,1,1,1,1,1]
[76] T76|Player 3 gains $1 from Salvage.
[76] T76|P3|ACT:Lost & Found
[76] T76|P3|ACT:Lost & Found|TAKE:MONEY:2|FROM:P0
[76] T76|P3|REV|S3:Vaccination Record
[77] T77|Player 3 gains $1 from Salvage.
[77] T77|P4|ACT:Payday
[77] T77|PAYDAY|SALARIES:[1,1,1,1,1,1]
[78] T78|P5|STEAL:Ticket|SKIP_NEXT
[78] T78|P5|TICKET_PASSPORT_BONUS|GAIN:1A
[79] T79|P0|PAY_FEE:5|TO:P3
[79] T79|P0|DISC:Vaccination Record|FROM:P3|GAIN:2
[79] T79|Player 3 gains $1 from Salvage.
[80] T80|Player 3 gains $1 from Salvage.
[80] T80|P1|ACT:Blacklisted
[80] T80|P1|ACT:Blacklisted|LOSS:1|KEEP
[80] T80|P1|REV|S0:Insider
[81] T81|P2|ACT:Payday
[81] T81|PAYDAY|SALARIES:[1,1,1,1,1,1]
[82] T82|Player 3 gains $1 from Salvage.
[82] T82|P3|ACT:Payday
[82] T82|PAYDAY|SALARIES:[1,1,1,1,1,1]
[82] T82|P3|REV|S7:Letter of Recommendation
[82] T82|P3|REV|S8:Pay Cut
[83] T83|Player 3 gains $1 from Salvage.
[83] T83|P4|ACT:Payday
[83] T83|PAYDAY|SALARIES:[1,1,1,1,1,1]
[84] T84|P5|SKIP_TURN
[85] T85|P0|PAY_FEE:5|TO:P3
[85] T85|P0|DISC:Letter of Recommendation|FROM:P3|GAIN:2
[85] T85|Player 3 gains $1 from Salvage.
[86] T86|Player 3 gains $1 from Salvage.
[86] T86|P1|BLACKLISTED|LOSS:1
[86] T86|P1|ACT:Insider
[86] T86|P1|KEEP:Insider
[87] T87|P2|ACT:Life Coach
[87] T87|P2|ACT:Life Coach|GAIN_A:1
[87] T87|P2|REV|S0:Friend moves to your Destination
[87] T87|P2|REV|S1:Video Chat with Person from Destination
[88] T88|Player 3 gains $1 from Salvage.
[88] T88|P3|ACT:Pay Cut
[88] T88|P3|ACT:Pay Cut|LOSS:1|KEEP
[89] T89|P4|PAY_FEE:3|TO:P3
[89] T89|P4|DISC:Support Group Motivates You|FROM:P3|GAIN:2
[89] T89|Player 3 gains $1 from Salvage.
[89] T89|P3|REV|S2:Coffee with Airport Employee
[90] T90|P5|PAY_FEE:3|TO:P3
[90] T90|P5|DISC:Learn from an Elder|FROM:P3|GAIN:2
[90] T90|Player 3 gains $1 from Salvage.
[90] T90|P3|REV|S0:Dinner with a Diplomat
[90] T90|P3|REV|S1:Payday
[91] T91|P0|PAY_FEE:5|TO:P3
[91] T91|P0|BUY:Coffee with Airport Employee|FROM:P3|COST:2
[92] T92|Player 3 gains $1 from Salvage.
[92] T92|P1|BLACKLISTED|LOSS:1
[92] T92|P1|ACT:Trousers Fall Down
[92] T92|P1|ACT:Trousers Fall Down|LOSS:3
[92] T92|P1|REV|S1:Politician Approves You
[93] T93|P2|PAY_FEE:3|TO:P3
[93] T93|P2|DISC:Dinner with a Diplomat|FROM:P3|GAIN:2
[94] T94|Player 3 gains $1 from Salvage.
[94] T94|P3|ACT:Payday
[94] T94|PAYDAY|SALARIES:[1,2,1,0,1,1]
[95] T95|P4|PAY_FEE:4|TO:P1
[95] T95|P4|DISC:Politician Approves You|FROM:P1|GAIN:2
[95] T95|Player 3 gains $1 from Salvage.
[96] T96|P5|PAY_FEE:4|TO:P2
[96] T96|P5|DISC:Video Chat with Person from Destination|FROM:P2|GAIN:2
[96] T96|Player 3 gains $1 from Salvage.
[97] T97|P0|STEAL:Ticket|SKIP_NEXT
[97] T97|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[98] T98|Player 3 gains $1 from Salvage.
[98] T98|P1|BLACKLISTED|LOSS:1
[98] T98|P1|ACT:Payday
[98] T98|PAYDAY|SALARIES:[1,2,1,0,1,1]
[99] T99|P2|PAY_FEE:4|TO:P1
[99] T99|P2|DISC:Employment Contract|FROM:P1|GAIN:2
[99] T99|P1|REV|S2:Bailout
[99] T99|P1|REV|S3:Camping
[100] T100|P3|PAY_FEE:5|TO:P2
[100] T100|P3|DISC:Friend moves to your Destination|FROM:P2|GAIN:2
[100] T100|Player 3 gains $1 from Salvage.
[101] T101|Player 3 gains $1 from Salvage.
[101] T101|P4|ACT:Payday
[101] T101|PAYDAY|SALARIES:[1,2,1,0,1,1]
[101] T101|P4|REV|S2:Vehicle Registration Papers
[102] T102|P5|PAY_FEE:5|TO:P4
[102] T102|P5|DISC:Vehicle Registration Papers|FROM:P4|GAIN:2
[102] T102|Player 3 gains $1 from Salvage.
[103] T103|P0|SKIP_TURN
[104] T104|Player 3 gains $1 from Salvage.
[104] T104|P1|BLACKLISTED|LOSS:1
[104] T104|P1|ACT:Bailout
[104] T104|P1|ACT:Bailout|DELTA:[1,1,0,0,0,0]
[105] T105|P2|PAY_FEE:5|TO:P1
[105] T105|P2|ACT:Camping
[105] T105|P2|ACT:Camping|DELTA:[1,1,2,1,1,1]
[106] T106|ROLL_D6:3
[106] T106|P3|COLLEGE_APP|ROLL:3|TUITION:5|RES:PASS
[107] T107|Player 3 gains $1 from Salvage.
[107] T107|P4|ACT:Payday
[107] T107|PAYDAY|SALARIES:[1,2,1,0,1,1]
[107] T107|P4|REV|S0:Language Phrasebook
[107] T107|P4|REV|S1:Payday
[108] T108|P5|PAY_FEE:5|TO:P4
[108] T108|P5|DISC:Language Phrasebook|FROM:P4|GAIN:2
[108] T108|Player 3 gains $1 from Salvage.
[109] T109|ROLL_D6:4
[109] T109|P0|COLLEGE_APP|ROLL:4|TUITION:6|RES:PASS
[110] T110|ROLL_D6:4
[110] T110|P1|COLLEGE_APP|ROLL:4|TUITION:10|RES:PASS
[111] T111|ROLL_D6:5
[111] T111|P2|COLLEGE_APP|ROLL:5|TUITION:7|RES:PASS
[112] T112|ROLL_D6:2
[112] T112|P3|GRAD|ROLL:2|RES:PASS|SALARY_INC:1
[112] T112|ROLL_D6:2
[112] T112|P3|COLLEGE_APP|ROLL:2|TUITION:4|RES:PASS
[113] T113|Player 3 gains $1 from Salvage.
[113] T113|P4|ACT:Payday
[113] T113|PAYDAY|SALARIES:[0,0,0,0,1,1]
[113] PHASE2_START
[113] PHASE2|P0|TRADE|PEN_D:-3A|TOTAL_A:-2
[113] PHASE2|P1|TRADE|$36:+12A|PEN_D:-2A|TOTAL_A:11
[113] PHASE2|P2|TRADE|$80:+20A|TOTAL_A:22
[113] PHASE2|P3|TRADE|$28:+8A|PEN_D:-3A|TOTAL_A:8
[113] PHASE2|P4|TRADE|$28:+8A|TOTAL_A:9
[113] PHASE2|P5|TRADE|$21:+6A|PEN_D:-3A|TOTAL_A:6
[113] PHASE2|P5|SELECT_LANE:Lane 1|TKN:7
[113] PHASE2|P5|CROSS:FAIL_LOW_A
[113] PHASE2|P0|SELECT_LANE:Lane 1|TKN:6
[113] PHASE2|P0|CROSS:FAIL_LOW_A
[113] PHASE2|P1|SELECT_LANE:Lane 1|TKN:7
[113] PHASE2|P1|CROSS:PASS|PAID_A:7|REM_A:4
[113] PHASE2|P2|SELECT_LANE:Lane 2|TKN:7
[113] PHASE2|P2|CROSS:PASS|PAID_A:7|REM_A:15
[113] PHASE2|P3|SELECT_LANE:Lane 2|TKN:6
[113] PHASE2|P3|CROSS:PASS|PAID_A:6|REM_A:2
[113] PHASE2|P4|SELECT_LANE:Lane 3|TKN:5
[113] PHASE2|P4|CROSS:PASS|PAID_A:5|REM_A:4
[113] GAME_OVER|WINNER: Player 3 (Assurance: 15, Money: $0)

[1] INIT|P0|NAT:Bosnian|DEST:China|$2|FACEUP:[4:Letter of Recommendation,5:Learn Song from Your Destination,6:Payday,11:Travel Brochure,12:Vehicle Registration Papers,13:Island Paradise]
[1] INIT|P1|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Attend Security Training,5:Excellent Teamwork,6:Personality Test,11:Stellar Reputation,12:Payday,13:Insider]
[1] T1|P0|BUY:Travel Brochure|FROM:P0|COST:2
[1] T1|P0|REV|S7:Coffee with Airport Employee
[2] T2|P1|PAY_FEE:1|TO:P0
[2] T2|P1|BUY:Coffee with Airport Employee|FROM:P0|COST:2
[3] T3|P0|STEAL:Passport|SKIP_NEXT
[4] T4|P1|STEAL:Ticket|SKIP_NEXT
[5] T5|P0|SKIP_TURN
[6] T6|P1|SKIP_TURN
[7] T7|P0|ACT:Island Paradise
[7] T7|P0|ACT:Island Paradise|DELTA:[1,1]
[7] T7|P0|REV|S10:Rummage Sale
[8] T8|P1|ACT:Insider
[8] T8|P1|KEEP:Insider
[8] T8|P1|REV|S10:Pandemic / Economic Stimulus
[9] T9|P0|ACT:Rummage Sale
[9] T9|P0|ACT:Rummage Sale|GAIN:3|NO_DOCS
[10] T10|P1|ACT:Pandemic / Economic Stimulus
[10] T10|ROLL_D6:1
[10] T10|P1|ACT:PANDEMIC_STIMULUS|DELTA:[-1,-1]
[11] T11|P0|PAY_FEE:1|TO:P1
[11] T11|P0|ACT:Stellar Reputation
[11] T11|P0|KEEP:Stellar Reputation
[11] T11|P1|REV|S7:Swap Wallets
[12] T12|P1|ACT:Swap Wallets
[12] T12|P1|ACT:Swap Wallets|SWAP:P0
[13] T13|P0|DISC:Vehicle Registration Papers|FROM:P0|GAIN:2
[13] T13|P0|REV|S8:Politician Approves You
[13] T13|P0|REV|S9:Payday
[14] T14|P1|PAY_FEE:2|TO:P0
[14] T14|P1|DISC:Politician Approves You|FROM:P0|GAIN:2
[15] T15|P0|ACT:Payday
[15] T15|PAYDAY|SALARIES:[1,2]
[16] T16|P1|PAY_FEE:3|TO:P0
[16] T16|P1|DISC:Letter of Recommendation|FROM:P0|GAIN:2
[16] T16|P0|REV|S0:Pandemic / Economic Stimulus
[17] T17|P0|BUY:Learn Song from Your Destination|FROM:P0|COST:1
[17] T17|P0|REV|S1:Payday
[18] T18|P1|ACT:Payday
[18] T18|PAYDAY|SALARIES:[1,2]
[18] T18|P1|REV|S8:Payday
[18] T18|P1|REV|S9:Payday
[19] T19|P0|STEAL:Ticket|SKIP_NEXT
[19] T19|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[20] T20|P1|ACT:Payday
[20] T20|PAYDAY|SALARIES:[1,2]
[21] T21|P0|SKIP_TURN
[22] T22|P1|BUY:Attend Security Training|FROM:P1|COST:3
[22] T22|P1|REV|S0:Travel Concierge
[23] T23|P0|ACT:Pandemic / Economic Stimulus
[23] T23|ROLL_D6:6
[23] T23|P0|ACT:PANDEMIC_STIMULUS|DELTA:[6,6]
[24] T24|P1|STEAL:Passport|SKIP_NEXT
[24] T24|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[25] T25|P0|PAY_FEE:2|TO:P1
[25] T25|P0|DISC:Travel Concierge|FROM:P1|GAIN:2
[26] T26|P1|SKIP_TURN
[27] T27|P0|ACT:Payday
[27] T27|PAYDAY|SALARIES:[1,2]
[28] T28|P1|ACT:Payday
[28] T28|PAYDAY|SALARIES:[1,2]
[29] T29|P0|PAY_FEE:3|TO:P1
[29] T29|P0|DISC:Personality Test|FROM:P1|GAIN:2
[29] T29|P1|REV|S3:Endorsement from Royalty
[30] T30|P1|BUY:Endorsement from Royalty|FROM:P1|COST:3
[31] T31|P0|PAY_FEE:4|TO:P1
[31] T31|P0|DISC:Excellent Teamwork|FROM:P1|GAIN:2
[31] T31|P1|REV|S1:Payday
[31] T31|P1|REV|S2:Certificate of Excellence
[32] T32|P1|ACT:Payday
[32] T32|PAYDAY|SALARIES:[1,2]
[33] T33|P0|ACT:Payday
[33] T33|PAYDAY|SALARIES:[1,2]
[33] T33|P0|REV|S2:Internship in Your Destination
[33] T33|P0|REV|S3:Travel Wallet
[34] T34|P1|PAY_FEE:4|TO:P0
[34] T34|P1|DISC:Internship in Your Destination|FROM:P0|GAIN:2
[35] T35|P0|BUY:Travel Wallet|FROM:P0|COST:3
[36] T36|P1|BUY:Certificate of Excellence|FROM:P1|COST:2
[36] PHASE2_START
[36] PHASE2|P0|TRADE|$20:+6A|TOTAL_A:7
[36] PHASE2|P1|TRADE|$18:+6A|TOTAL_A:7
[36] PHASE2|P0|SELECT_LANE:Lane 1|TKN:7
[36] PHASE2|P0|CROSS:PASS|PAID_A:7|REM_A:0
[36] PHASE2|P1|SELECT_LANE:Lane 1|TKN:7
[36] PHASE2|P1|CROSS:PASS|PAID_A:7|REM_A:0
[36] GAME_OVER|WINNER: Player 2 (Assurance: 0, Money: $3)

[1] INIT|P0|NAT:Bosnian|DEST:China|$2|FACEUP:[4:Insider,5:Swap Wallets,6:Background Check,11:Personality Test,12:Employment Contract,13:Payday]
[1] INIT|P1|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Attend History Class,5:Travel Concierge,6:Stellar Reputation,11:Payday,12:Payday,13:Copy of Birth Certificate]
[1] T1|P0|ACT:Payday
[1] T1|PAYDAY|SALARIES:[1,1]
[1] T1|P0|REV|S10:Language Phrasebook
[2] T2|P1|BUY:Copy of Birth Certificate|FROM:P1|COST:2
[2] T2|P1|REV|S10:Rummage Sale
[3] T3|P0|BUY:Personality Test|FROM:P0|COST:3
[3] T3|P0|REV|S7:Island Paradise
[4] T4|P1|STEAL:Passport|SKIP_NEXT
[5] T5|P0|STEAL:Passport|SKIP_NEXT
[6] T6|P1|SKIP_TURN
[7] T7|P0|SKIP_TURN
[8] T8|P1|PAY_FEE:1|TO:P0
[8] T8|P1|DISC:Employment Contract|FROM:P0|GAIN:2
[8] T8|P0|REV|S8:Certificate of Excellence
[8] T8|P0|REV|S9:Mental Fog
[9] T9|P0|ACT:Mental Fog
[9] T9|P0|ACT:Mental Fog|LOSS:1
[10] T10|P1|PAY_FEE:2|TO:P0
[10] T10|P1|DISC:Certificate of Excellence|FROM:P0|GAIN:2
[11] T11|P0|ACT:Swap Wallets
[11] T11|P0|ACT:Swap Wallets|SWAP:P1
[12] T12|P1|ACT:Rummage Sale
[12] T12|P1|ACT:Rummage Sale|GAIN:3
[13] T13|P0|ACT:Island Paradise
[13] T13|P0|ACT:Island Paradise|DELTA:[2,1]
[14] T14|P1|PAY_FEE:3|TO:P0
[14] T14|P1|DISC:Language Phrasebook|FROM:P0|GAIN:2
[15] T15|P0|ACT:Insider
[15] T15|P0|KEEP:Insider
[15] T15|P0|REV|S0:Dinner with a Diplomat
[15] T15|P0|REV|S1:Payday
[16] T16|P1|PAY_FEE:4|TO:P0
[16] T16|P1|DISC:Background Check|FROM:P0|GAIN:2
[16] T16|P0|REV|S2:Payday
[16] T16|P0|REV|S3:Pandemic / Economic Stimulus
[17] T17|P0|BUY:Dinner with a Diplomat|FROM:P0|COST:3
[18] T18|P1|ACT:Payday
[18] T18|PAYDAY|SALARIES:[2,1]
[18] T18|P1|REV|S7:Pandemic / Economic Stimulus
[19] T19|P0|STEAL:Ticket|SKIP_NEXT
[19] T19|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[20] T20|P1|ACT:Pandemic / Economic Stimulus
[20] T20|ROLL_D6:2
[20] T20|P1|ACT:PANDEMIC_STIMULUS|DELTA:[-2,-2]
[21] T21|P0|SKIP_TURN
[22] T22|P1|ACT:Payday
[22] T22|PAYDAY|SALARIES:[2,1]
[22] T22|P1|REV|S8:Payday
[22] T22|P1|REV|S9:Listen to the News
[23] T23|P0|PAY_FEE:1|TO:P1
[23] T23|P0|DISC:Listen to the News|FROM:P1|GAIN:2
[24] T24|P1|ACT:Stellar Reputation
[24] T24|P1|KEEP:Stellar Reputation
[24] T24|P1|REV|S3:Payday
[25] T25|P0|ACT:Pandemic / Economic Stimulus
[25] T25|ROLL_D6:1
[25] T25|P0|ACT:PANDEMIC_STIMULUS|DELTA:[1,1]
[26] T26|P1|ACT:Payday
[26] T26|PAYDAY|SALARIES:[2,1]
[27] T27|P0|PAY_FEE:2|TO:P1
[27] T27|P0|DISC:Travel Concierge|FROM:P1|GAIN:2
[27] T27|P1|REV|S2:Write Last Will and Testament
[28] T28|P1|BUY:Attend History Class|FROM:P1|COST:3
[28] T28|P1|REV|S0:Cookies for Neighbor from Destination
[28] T28|P1|REV|S1:Politician Approves You
[29] T29|P0|ACT:Payday
[29] T29|PAYDAY|SALARIES:[2,1]
[30] T30|P1|STEAL:Ticket|SKIP_NEXT
[30] T30|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[31] T31|P0|ACT:Payday
[31] T31|PAYDAY|SALARIES:[2,1]
[32] T32|P1|SKIP_TURN
[33] T33|P0|PAY_FEE:3|TO:P1
[33] T33|P0|DISC:Write Last Will and Testament|FROM:P1|GAIN:2
[34] T34|P1|BUY:Cookies for Neighbor from Destination|FROM:P1|COST:1
[35] T35|P0|PAY_FEE:4|TO:P1
[35] T35|P0|DISC:Politician Approves You|FROM:P1|GAIN:2
[36] T36|P1|ACT:Payday
[36] T36|PAYDAY|SALARIES:[2,1]
[36] PHASE2_START
[36] PHASE2|P0|TRADE|$20:+6A|PEN_D:-3A|TOTAL_A:4
[36] PHASE2|P1|TRADE|$12:+4A|PEN_D:-2A|TOTAL_A:3
[36] PHASE2|P0|SELECT_LANE:Lane 4|TKN:9
[36] PHASE2|P0|CROSS:FAIL_LOW_A
[36] PHASE2|P1|SELECT_LANE:Lane 5|TKN:3
[36] PHASE2|P1|CROSS:PASS|PAID_A:3|REM_A:0
[36] GAME_OVER|WINNER: Player 2 (Assurance: 0, Money: $2)

[1] INIT|P0|NAT:Bosnian|DEST:China|$2|FACEUP:[4:Trousers Fall Down,5:Cookies for Neighbor from Destination,6:Learn from an Elder,11:Write Last Will and Testament,12:Personality Test,13:Fancy Clothes]
[1] INIT|P1|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Lost & Found,5:Notebook,6:Payday,11:Listen to the News,12:Enter Luxury Travel Club,13:Payday]
[1] INIT|P2|NAT:Congolese|DEST:France|$2|FACEUP:[4:Copy of Birth Certificate,5:Support Group Motivates You,6:Shredder Accident,11:Payday,12:Payday,13:Payday]
[1] INIT|P3|NAT:French|DEST:Russia|$5|FACEUP:[4:Keep Calm,5:Tariffs,6:Boost,11:Nostalgia,12:Payday,13:Payday]
[1] T1|P0|BUY:Write Last Will and Testament|FROM:P0|COST:2
[1] T1|P0|REV|S7:Payday
[2] T2|P1|BUY:Listen to the News|FROM:P1|COST:2
[2] T2|P1|REV|S7:Payday
[3] T3|P2|PAY_FEE:1|TO:P1
[3] T3|P2|DISC:Enter Luxury Travel Club|FROM:P1|GAIN:2
[3] T3|P1|REV|S8:Physical Exam
[4] T4|P3|PAY_FEE:1|TO:P0
[4] T4|P3|BUY:Personality Test|FROM:P0|COST:3
[4] T4|P0|REV|S8:Social Butterfly
[5] T5|P0|STEAL:Passport|SKIP_NEXT
[6] T6|P1|BUY:Physical Exam|FROM:P1|COST:3
[7] T7|ROLL_D6:5
[7] T7|P2|COLLEGE_APP|ROLL:5|TUITION:7|RES:FAIL
[7] T7|P2|ACT:Payday
[7] T7|PAYDAY|SALARIES:[1,1,1,1]
[8] T8|P3|STEAL:Passport|SKIP_NEXT
[9] T9|P0|SKIP_TURN
[10] T10|P1|STEAL:Passport|SKIP_NEXT
[11] T11|P2|ACT:Payday
[11] T11|PAYDAY|SALARIES:[1,1,1,1]
[11] T11|P2|REV|S7:Travel Brochure
[11] T11|P2|REV|S8:Payday
[12] T12|P3|SKIP_TURN
[13] T13|P0|ACT:Payday
[13] T13|PAYDAY|SALARIES:[1,1,1,1]
[14] T14|P1|SKIP_TURN
[15] T15|P2|BUY:Travel Brochure|FROM:P2|COST:2
[16] T16|P3|ACT:Nostalgia
[16] T16|P3|ACT:Nostalgia|GAIN:2|NO_LIFE
[16] T16|P3|REV|S7:Life Coach
[17] T17|P0|ACT:Fancy Clothes
[17] T17|P0|KEEP:Fancy Clothes
[17] T17|P0|REV|S9:Endorsement from Royalty
[17] T17|P0|REV|S10:Language Classes
[18] T18|P1|SELL:Listen to the News|GAIN:2
[18] T18|P1|PAY_FEE:1|TO:P0
[18] T18|P1|BUY:Endorsement from Royalty|FROM:P0|COST:3
[19] T19|P2|STEAL:Passport|SKIP_NEXT
[20] T20|P3|PAY_FEE:2|TO:P0
[20] T20|P3|BUY:Language Classes|FROM:P0|COST:3
[21] T21|P0|BUY:Learn from an Elder|FROM:P0|COST:3
[21] T21|P0|REV|S3:Payday
[22] T22|P1|STEAL:Ticket|SKIP_NEXT
[22] T22|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[23] T23|P2|SKIP_TURN
[24] T24|P3|STEAL:Ticket|SKIP_NEXT
[24] T24|P3|TICKET_PASSPORT_BONUS|GAIN:1A
[25] T25|P0|STEAL:Ticket|SKIP_NEXT
[25] T25|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[26] T26|P1|SKIP_TURN
[27] T27|P2|ACT:Payday
[27] T27|PAYDAY|SALARIES:[1,1,1,1]
[28] T28|P3|SKIP_TURN
[29] T29|P0|SKIP_TURN
[30] T30|P1|PAY_FEE:2|TO:P2
[30] T30|P1|DISC:Copy of Birth Certificate|FROM:P2|GAIN:2
[30] T30|P2|REV|S0:Letter of Recommendation
[31] T31|P2|BUY:Letter of Recommendation|FROM:P2|COST:3
[32] T32|P3|ACT:Life Coach
[32] T32|P3|ACT:Life Coach|GAIN_A:1
[33] T33|P0|ACT:Social Butterfly
[33] T33|P0|ACT:Social Butterfly|TAKE:MONEY:3|FROM:P1
[34] T34|P1|ACT:Payday
[34] T34|PAYDAY|SALARIES:[1,1,1,1]
[34] T34|P1|REV|S9:Vaccination Record
[34] T34|P1|REV|S10:Attend History Class
[35] T35|P2|PAY_FEE:2|TO:P0
[35] T35|P2|BUY:Cookies for Neighbor from Destination|FROM:P0|COST:2
[35] T35|P0|REV|S2:Travel Wallet
[36] T36|P3|PAY_FEE:3|TO:P0
[36] T36|P3|DISC:Travel Wallet|FROM:P0|GAIN:2
[37] T37|P0|PAY_FEE:1|TO:P1
[37] T37|P0|DISC:Vaccination Record|FROM:P1|GAIN:2
[38] T38|P1|ACT:Payday
[38] T38|PAYDAY|SALARIES:[1,1,1,1]
[39] T39|P2|STEAL:Ticket|SKIP_NEXT
[39] T39|P2|TICKET_PASSPORT_BONUS|GAIN:1A
[40] T40|P3|ACT:Payday
[40] T40|PAYDAY|SALARIES:[1,1,1,1]
[40] T40|P3|REV|S8:Camping
[41] T41|P0|ACT:Trousers Fall Down
[41] T41|P0|ACT:Trousers Fall Down|LOSS:3
[41] T41|P0|REV|S0:Dinner with a Diplomat
[41] T41|P0|REV|S1:Employment Contract
[42] T42|P1|PAY_FEE:3|TO:P0
[42] T42|P1|DISC:Employment Contract|FROM:P0|GAIN:2
[43] T43|P2|SKIP_TURN
[44] T44|P3|PAY_FEE:4|TO:P0
[44] T44|P3|DISC:Dinner with a Diplomat|FROM:P0|GAIN:2
[45] T45|P0|PAY_FEE:2|TO:P1
[45] T45|P0|DISC:Notebook|FROM:P1|GAIN:2
[46] T46|P1|ACT:Lost & Found
[46] T46|P1|ACT:Lost & Found|TAKE:MONEY:2|FROM:P0
[46] T46|P1|REV|S0:Identical Twin
[46] T46|P1|REV|S1:International Driving Permit
[47] T47|P2|ACT:Payday
[47] T47|PAYDAY|SALARIES:[1,1,1,1]
[47] T47|P2|REV|S9:Learn Song from Your Destination
[47] T47|P2|REV|S10:VIP
[48] T48|P3|ACT:Camping
[48] T48|P3|ACT:Camping|DELTA:[1,1,1,2]
[49] T49|P0|ACT:Payday
[49] T49|PAYDAY|SALARIES:[1,1,1,1]
[50] T50|P1|ACT:Identical Twin
[50] T50|P1|ACT:Identical Twin|GAIN:1|EXTRA_TURN
[50] T50|P1|PAY_FEE:4|TO:P2
[50] T50|P1|DISC:Learn Song from Your Destination|FROM:P2|GAIN:2
[51] T51|P2|PAY_FEE:3|TO:P1
[51] T51|P2|DISC:Attend History Class|FROM:P1|GAIN:2
[52] T52|P3|ACT:Keep Calm
[52] T52|P3|ACT:Keep Calm|GAIN:1|KEEP
[52] T52|P3|REV|S0:Persuasion
[53] T53|P0|PAY_FEE:3|TO:P1
[53] T53|P0|DISC:International Driving Permit|FROM:P1|GAIN:2
[54] T54|P1|ACT:Payday
[54] T54|PAYDAY|SALARIES:[1,1,1,1]
[54] T54|P1|REV|S2:Payday
[54] T54|P1|REV|S3:FOMO
[55] T55|P2|ACT:VIP
[55] T55|P2|ACT:VIP|GAIN:11
[56] T56|P3|ACT:Persuasion
[56] T56|P3|ACT:Persuasion|GAIN:1|KEEP
[57] T57|P0|PAY_FEE:4|TO:P2
[57] T57|P0|DISC:Support Group Motivates You|FROM:P2|GAIN:2
[57] T57|P2|REV|S1:Friend moves to your Destination
[58] T58|P1|ACT:FOMO
[58] T58|P1|ACT:FOMO|LOSS:1
[59] T59|P2|ACT:Shredder Accident
[59] T59|P2|ACT:Shredder Accident|DISC:Travel Brochure
[59] T59|P2|REV|S2:Payday
[59] T59|P2|REV|S3:Payday
[60] T60|P3|ACT:Payday
[60] T60|PAYDAY|SALARIES:[1,1,1,1]
[60] T60|P3|REV|S9:Travel Concierge
[60] T60|P3|REV|S10:Productivity
[61] T61|P0|PAY_FEE:5|TO:P2
[61] T61|P0|DISC:Friend moves to your Destination|FROM:P2|GAIN:2
[62] T62|P1|ACT:Payday
[62] T62|PAYDAY|SALARIES:[1,1,1,1]
[63] T63|P2|ACT:Payday
[63] T63|PAYDAY|SALARIES:[1,1,1,1]
[64] T64|P3|ACT:Productivity
[64] T64|P3|ACT:Productivity|GAIN:1|FEE_DEC:1
[65] T65|P0|PAY_FEE:5|TO:P3
[65] T65|P0|DISC:Travel Concierge|FROM:P3|GAIN:2
[66] T66|P1|PAY_FEE:5|TO:P3
[66] T66|P1|ACT:Tariffs
[66] T66|P1|ACT:Tariffs|LOSS:1|FEE_INC:1
[66] T66|P3|REV|S1:Vehicle Registration Papers
[67] T67|P2|PAY_FEE:4|TO:P3
[67] T67|P2|DISC:Vehicle Registration Papers|FROM:P3|GAIN:2
[68] T68|P3|ACT:Boost
[68] T68|P3|ACT:Boost|GAIN:1|FROM_NAT_STARTING:P0
[68] T68|P3|REV|S2:Language Phrasebook
[68] T68|P3|REV|S3:Politician Approves You
[69] T69|P0|PAY_FEE:5|TO:P3
[69] T69|P0|DISC:Language Phrasebook|FROM:P3|GAIN:2
[70] T70|P1|PAY_FEE:5|TO:P3
[70] T70|P1|DISC:Politician Approves You|FROM:P3|GAIN:2
[71] T71|P2|ACT:Payday
[71] T71|PAYDAY|SALARIES:[1,1,1,1]
[71] PHASE2_START
[71] PHASE2|P0|TRADE|$10:+3A|PEN_D:-3A|TOTAL_A:1
[71] PHASE2|P1|TRADE|$6:+2A|PEN_D:-2A|TOTAL_A:1
[71] PHASE2|P2|TRADE|$24:+6A|PEN_D:-3A|TOTAL_A:4
[71] PHASE2|P3|TRADE|$35:+10A|PEN_D:-3A|TOTAL_A:9
[71] PHASE2|P3|SELECT_LANE:Lane 1|TKN:7
[71] PHASE2|P3|CROSS:PASS|PAID_A:7|REM_A:2
[71] PHASE2|P0|SELECT_LANE:Lane 1|TKN:7
[71] PHASE2|P0|CROSS:FAIL_LOW_A
[71] PHASE2|P1|SELECT_LANE:Lane 1|TKN:6
[71] PHASE2|P1|CROSS:FAIL_LOW_A
[71] PHASE2|P2|SELECT_LANE:Lane 4|TKN:9
[71] PHASE2|P2|CROSS:FAIL_LOW_A
[71] GAME_OVER|WINNER: Player 4 (Assurance: 2, Money: $4)
