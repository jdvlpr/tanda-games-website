[1] INIT|P0|NAT:Bosnian|DEST:China|$2|FACEUP:[4:Employment Contract,5:Notebook,6:Payday,11:Language Phrasebook,12:Shredder Accident,13:Life Coach]
[1] INIT|P1|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Coffee with Airport Employee,5:Dinner with a Diplomat,6:Excellent Teamwork,11:Bailout,12:Pandemic / Economic Stimulus,13:Mental Fog]
[1] INIT|P2|NAT:Congolese|DEST:France|$2|FACEUP:[4:Insider,5:Checklist,6:Pet Passport,11:Travel Brochure,12:Keep Calm,13:Reward]
[1] INIT|P3|NAT:French|DEST:Russia|$5|FACEUP:[4:Payday,5:Listen to the News,6:Certificate of Excellence,11:Payday,12:Lost & Found,13:Payday]
[1] INIT|P4|NAT:Russian|DEST:Senegal|$5|FACEUP:[4:Payday,5:Payday,6:Payday,11:Pay Cut,12:VIP,13:Payday]
[1] INIT|P5|NAT:Senegalese|DEST:Switzerland|$3|FACEUP:[4:Payday,5:Background Check,6:Payday,11:Pandemic / Economic Stimulus,12:Personality Test,13:Get Engaged to a Native]
[1] T1|P0|PAY_FEE:1|TO:P2
[1] T1|P0|DISC:Travel Brochure|FROM:P2|GAIN:2
[1] T1|P2|REV|S7:Friend moves to your Destination
[2] T2|P1|PAY_FEE:1|TO:P2
[2] T2|P1|BUY:Friend moves to your Destination|FROM:P2|COST:2
[3] T3|P2|PAY_FEE:1|TO:P5
[3] T3|P2|BUY:Personality Test|FROM:P5|COST:3
[4] T4|P3|PAY_FEE:1|TO:P0
[4] T4|P3|BUY:Language Phrasebook|FROM:P0|COST:4
[4] T4|P0|REV|S7:Share
[5] T5|P4|PAY_FEE:1|TO:P5
[5] T5|P4|BUY:Get Engaged to a Native|FROM:P5|COST:4
[5] T5|P5|REV|S9:Vaccination Record
[5] T5|P5|REV|S10:Network Fair
[6] T6|P5|BUY:Vaccination Record|FROM:P5|COST:3
[7] T7|ROLL_D6:2
[7] T7|P0|COLLEGE_APP|ROLL:2|TUITION:3|RES:PASS
[8] T8|P1|SELL:Friend moves to your Destination|GAIN:2
[8] T8|P1|PAY_FEE:2|TO:P5
[8] T8|P1|BUY:Network Fair|FROM:P5|COST:3
[9] T9|P2|STEAL:Passport|SKIP_NEXT
[10] T10|P3|STEAL:Passport|SKIP_NEXT
[11] T11|P4|STEAL:Ticket|SKIP_NEXT
[12] T12|P5|STEAL:Passport|SKIP_NEXT
[13] T13|ROLL_D6:3
[13] T13|P0|GRAD|ROLL:3|RES:PASS|SALARY_INC:1
[13] T13|P0|ACT:Shredder Accident
[13] T13|P0|ACT:Shredder Accident|LOSS:1|NO_DOCS
[13] T13|P0|REV|S8:Attend Security Training
[14] T14|P1|STEAL:Ticket|SKIP_NEXT
[15] T15|P2|SKIP_TURN
[16] T16|P3|SKIP_TURN
[17] T17|P4|SKIP_TURN
[18] T18|P5|SKIP_TURN
[19] T19|P0|ACT:Share
[19] T19|P0|ACT:Share|DELTA:[0,0,0,0,0,0]
[20] T20|P1|SKIP_TURN
[21] T21|P2|ACT:Reward
[21] T21|P2|ACT:Reward|DELTA:[0,0,2,0,0,-1]
[21] T21|P2|REV|S10:Favorable Cultural Opinion
[22] T22|P3|ACT:Payday
[22] T22|PAYDAY|SALARIES:[2,1,1,1,1,1]
[22] T22|P3|REV|S7:Video Chat with Person from Destination
[23] T23|P4|ACT:Pay Cut
[23] T23|P4|ACT:Pay Cut|LOSS:1|KEEP
[23] T23|P4|REV|S7:Payday
[24] T24|P5|PAY_FEE:1|TO:P3
[24] T24|P5|BUY:Video Chat with Person from Destination|FROM:P3|COST:2
[25] T25|ROLL_D6:4
[25] T25|P0|COLLEGE_APP|ROLL:4|TUITION:6|RES:FAIL
[25] T25|P0|ACT:Life Coach
[25] T25|P0|ACT:Life Coach|GAIN_A:1
[25] T25|P0|REV|S9:Support Group Motivates You
[25] T25|P0|REV|S10:Attend History Class
[26] T26|P1|ACT:Bailout
[26] T26|P1|ACT:Bailout|DELTA:[0,1,0,0,1,0]
[26] T26|P1|REV|S7:Letter of Invitation
[27] T27|P2|SELL:Personality Test|GAIN:2
[27] T27|P2|BUY:Favorable Cultural Opinion|FROM:P2|COST:4
[28] T28|P3|PAY_FEE:2|TO:P1
[28] T28|P3|DISC:Letter of Invitation|FROM:P1|GAIN:2
[29] T29|P4|ACT:VIP
[29] T29|P4|ACT:VIP|GAIN:2
[29] T29|P4|REV|S8:Travel Wallet
[30] T30|P5|STEAL:Ticket|SKIP_NEXT
[30] T30|P5|TICKET_PASSPORT_BONUS|GAIN:1A
[31] T31|P0|DISC:Attend Security Training|FROM:P0|GAIN:2
[32] T32|ROLL_D6:4
[32] T32|P1|COLLEGE_APP|ROLL:4|TUITION:10|RES:FAIL
[32] T32|P1|ACT:Mental Fog
[32] T32|P1|ACT:Mental Fog|LOSS:1
[32] T32|P1|REV|S10:Internship in Your Destination
[33] T33|P2|STEAL:Ticket|SKIP_NEXT
[33] T33|P2|TICKET_PASSPORT_BONUS|GAIN:1A
[34] T34|P3|ACT:Lost & Found
[34] T34|P3|ACT:Lost & Found|TAKE:MONEY:2|FROM:P0
[34] T34|P3|REV|S8:Payday
[35] T35|P4|BUY:Travel Wallet|FROM:P4|COST:3
[36] T36|P5|SKIP_TURN
[37] T37|P0|DISC:Employment Contract|FROM:P0|GAIN:2
[37] T37|P0|REV|S0:Payday
[38] T38|P1|ACT:Pandemic / Economic Stimulus
[38] T38|ROLL_D6:6
[38] T38|P1|ACT:PANDEMIC_STIMULUS|DELTA:[-3,-2,-1,-4,0,-1]
[38] T38|P1|REV|S8:Payday
[38] T38|P1|REV|S9:FOMO
[39] T39|P2|SKIP_TURN
[40] T40|P3|ACT:Payday
[40] T40|PAYDAY|SALARIES:[2,1,1,1,0,1]
[40] T40|P3|REV|S9:Philanthropy
[40] T40|P3|REV|S10:Travel Concierge
[41] T41|P4|STEAL:Passport|SKIP_NEXT
[41] T41|P4|TICKET_PASSPORT_BONUS|GAIN:1A
[42] T42|P5|ACT:Payday
[42] T42|PAYDAY|SALARIES:[2,1,1,1,0,1]
[42] T42|P5|REV|S3:International Driving Permit
[43] T43|P0|BUY:Support Group Motivates You|FROM:P0|COST:2
[44] T44|P1|ACT:FOMO
[44] T44|P1|ACT:FOMO|LOSS:1
[45] T45|ROLL_D6:2
[45] T45|P2|COLLEGE_APP|ROLL:2|TUITION:3|RES:FAIL
[45] T45|P2|ACT:Keep Calm
[45] T45|P2|ACT:Keep Calm|GAIN:1|KEEP
[45] T45|P2|REV|S8:Fancy Clothes
[45] T45|P2|REV|S9:Payday
[46] T46|P3|ACT:Philanthropy
[46] T46|P3|ACT:Philanthropy|DELTA:[0,0,1,-2,0,0]
[47] T47|P4|SKIP_TURN
[48] T48|ROLL_D6:5
[48] T48|P5|COLLEGE_APP|ROLL:5|TUITION:8|RES:FAIL
[48] T48|P5|ACT:Pandemic / Economic Stimulus
[48] T48|ROLL_D6:1
[48] T48|P5|ACT:PANDEMIC_STIMULUS|DELTA:[1,1,1,1,1,1]
[48] T48|P5|REV|S7:Payday
[48] T48|P5|REV|S8:Learn from an Elder
[49] T49|P0|BUY:Notebook|FROM:P0|COST:2
[49] T49|P0|REV|S1:Trousers Fall Down
[50] T50|P1|ACT:Payday
[50] T50|PAYDAY|SALARIES:[2,1,1,1,0,1]
[51] T51|ROLL_D6:6
[51] T51|P2|COLLEGE_APP|ROLL:6|TUITION:8|RES:FAIL
[51] T51|P2|PAY_FEE:2|TO:P3
[51] T51|P2|DISC:Travel Concierge|FROM:P3|GAIN:2
[52] T52|P3|BUY:Certificate of Excellence|FROM:P3|COST:2
[52] T52|P3|REV|S3:Vehicle Registration Papers
[53] T53|P4|ACT:Payday
[53] T53|PAYDAY|SALARIES:[2,1,1,1,0,1]
[53] T53|P4|REV|S9:Nostalgia
[53] T53|P4|REV|S10:Cookies for Neighbor from Destination
[54] T54|ROLL_D6:5
[54] T54|P5|COLLEGE_APP|ROLL:5|TUITION:8|RES:FAIL
[54] T54|P5|PAY_FEE:2|TO:P1
[54] T54|P5|DISC:Coffee with Airport Employee|FROM:P1|GAIN:2
[54] T54|P1|REV|S0:Language Classes
[55] T55|P0|ACT:Payday
[55] T55|PAYDAY|SALARIES:[2,1,1,1,0,1]
[56] T56|ROLL_D6:1
[56] T56|P1|COLLEGE_APP|ROLL:1|TUITION:4|RES:PASS
[57] T57|ROLL_D6:4
[57] T57|P2|COLLEGE_APP|ROLL:4|TUITION:6|RES:PASS
[58] T58|ROLL_D6:5
[58] T58|P3|COLLEGE_APP|ROLL:5|TUITION:10|RES:FAIL
[58] T58|P3|ACT:Payday
[58] T58|PAYDAY|SALARIES:[2,0,0,1,0,1]
[59] T59|P4|ACT:Nostalgia
[59] T59|P4|ACT:Nostalgia|GAIN:2
[60] T60|ROLL_D6:3
[60] T60|P5|COLLEGE_APP|ROLL:3|TUITION:4|RES:PASS
[61] T61|P0|SELL:Support Group Motivates You|GAIN:2
[61] T61|P0|PAY_FEE:2|TO:P3
[61] T61|P0|BUY:Listen to the News|FROM:P3|COST:2
[61] T61|P3|REV|S2:Camping
[62] T62|ROLL_D6:4
[62] T62|P1|GRAD|ROLL:4|RES:FAIL
[62] T62|ROLL_D6:2
[62] T62|P1|GRAD|ROLL:2|RES:PASS|SALARY_INC:1
[62] T62|P1|PAY_FEE:3|TO:P5
[62] T62|P1|DISC:International Driving Permit|FROM:P5|GAIN:2
[63] T63|ROLL_D6:4
[63] T63|P2|GRAD|ROLL:4|RES:FAIL
[63] T63|ROLL_D6:6
[63] T63|P2|GRAD|ROLL:6|RES:FAIL
[63] T63|P2|ACT:Payday
[63] T63|PAYDAY|SALARIES:[2,2,0,1,0,0]
[64] T64|P3|PAY_FEE:3|TO:P4
[64] T64|P3|BUY:Cookies for Neighbor from Destination|FROM:P4|COST:2
[65] T65|ROLL_D6:3
[65] T65|P4|COLLEGE_APP|ROLL:3|TUITION:5|RES:PASS
[66] T66|ROLL_D6:2
[66] T66|P5|GRAD|ROLL:2|RES:PASS|SALARY_INC:1
[66] T66|P5|ACT:Payday
[66] T66|PAYDAY|SALARIES:[2,2,0,1,0,2]
[67] T67|P0|SELL:Listen to the News|GAIN:2
[67] T67|P0|BUY:Attend History Class|FROM:P0|COST:4
[68] T68|ROLL_D6:6
[68] T68|P1|COLLEGE_APP|ROLL:6|TUITION:12|RES:FAIL
[68] T68|P1|BUY:Language Classes|FROM:P1|COST:3
[69] T69|ROLL_D6:2
[69] T69|P2|GRAD|ROLL:2|RES:PASS|SALARY_INC:1
[69] T69|P2|ACT:Fancy Clothes
[69] T69|P2|KEEP:Fancy Clothes
[70] T70|P3|STEAL:Ticket|SKIP_NEXT
[70] T70|P3|TICKET_PASSPORT_BONUS|GAIN:1A
[71] T71|ROLL_D6:3
[71] T71|P4|GRAD|ROLL:3|RES:PASS|SALARY_INC:1
[71] T71|P4|ACT:Payday
[71] T71|PAYDAY|SALARIES:[2,2,2,1,1,2]
[72] T72|P5|PAY_FEE:3|TO:P2
[72] T72|P5|DISC:Checklist|FROM:P2|GAIN:2
[73] T73|P0|ACT:Payday
[73] T73|PAYDAY|SALARIES:[2,2,2,1,1,2]
[73] T73|P0|REV|S2:Endorsement from Royalty
[73] T73|P0|REV|S3:Payday
[74] T74|P1|BUY:Dinner with a Diplomat|FROM:P1|COST:3
[74] T74|P1|REV|S1:Payday
[75] T75|P2|BUY:Pet Passport|FROM:P2|COST:3
[75] T75|P2|REV|S2:Salvage
[75] T75|P2|REV|S3:Enter Luxury Travel Club
[76] T76|P3|SKIP_TURN
[77] T77|P4|ACT:Payday
[77] T77|PAYDAY|SALARIES:[2,2,2,1,1,2]
[78] T78|P5|PAY_FEE:4|TO:P3
[78] T78|P5|DISC:Vehicle Registration Papers|FROM:P3|GAIN:2
[79] T79|P0|SELL:Attend History Class|GAIN:2
[79] T79|P0|BUY:Endorsement from Royalty|FROM:P0|COST:3
[80] T80|P1|ACT:Payday
[80] T80|PAYDAY|SALARIES:[2,2,2,1,1,2]
[81] T81|P2|ACT:Insider
[81] T81|P2|KEEP:Insider
[81] T81|P2|REV|S0:Subscribe to Travel Updates
[81] T81|P2|REV|S1:Blacklisted
[82] T82|P3|ACT:Camping
[82] T82|P3|ACT:Camping|DELTA:[1,0,1,2,1,1]
[83] T83|P4|ACT:Payday
[83] T83|PAYDAY|SALARIES:[2,2,3,1,1,2]
[83] T83|P4|REV|S0:Learn Song from Your Destination
[83] T83|P4|REV|S1:Write Last Will and Testament
[84] T84|P5|PAY_FEE:5|TO:P1
[84] T84|P5|DISC:Internship in Your Destination|FROM:P1|GAIN:2
[85] T85|P0|SELL:Notebook|GAIN:2
[85] T85|P0|PAY_FEE:3|TO:P4
[85] T85|P0|BUY:Write Last Will and Testament|FROM:P4|COST:2
[86] T86|P1|PAY_FEE:4|TO:P2
[86] T86|P1|BUY:Subscribe to Travel Updates|FROM:P2|COST:2
[87] T87|P2|ACT:Blacklisted
[87] T87|P2|ACT:Blacklisted|LOSS:1|KEEP
[88] T88|P3|ACT:Payday
[88] T88|PAYDAY|SALARIES:[2,2,3,1,1,2]
[88] T88|P3|REV|S0:Suspect
[88] T88|P3|REV|S1:Payday
[89] T89|P4|ACT:Payday
[89] T89|PAYDAY|SALARIES:[2,2,3,1,1,2]
[89] T89|P4|REV|S2:Payday
[89] T89|P4|REV|S3:Payday
[90] T90|P5|DISC:Learn from an Elder|FROM:P5|GAIN:2
[91] T91|P0|STEAL:Passport|SKIP_NEXT
[92] T92|P1|STEAL:Passport|SKIP_NEXT
[92] T92|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[93] T93|P2|BLACKLISTED|LOSS:1
[93] T93|P2|ACT:Salvage
[93] T93|P2|ACT:Salvage|GAIN:1|KEEP
[94] T94|Player 3 gains $1 from Salvage.
[94] T94|P3|ACT:Suspect
[94] T94|P3|ACT:Suspect|LOSS:1
[94] T94|P3|ACT:Suspect|DISC:Cookies for Neighbor from Destination
[94] T94|Player 3 gains $1 from Salvage.
[95] T95|Player 3 gains $1 from Salvage.
[95] T95|P4|ACT:Payday
[95] T95|PAYDAY|SALARIES:[2,2,3,1,1,2]
[96] T96|Player 3 gains $1 from Salvage.
[96] T96|P5|ACT:Payday
[96] T96|PAYDAY|SALARIES:[2,2,3,1,1,2]
[96] T96|P5|REV|S0:Residence Address in Destination
[97] T97|P0|SKIP_TURN
[98] T98|P1|SKIP_TURN
[99] T99|P2|PAY_FEE:3|TO:P1
[99] T99|P2|DISC:Excellent Teamwork|FROM:P1|GAIN:2
[99] T99|P2|BLACKLISTED|LOSS:1
[99] T99|P1|REV|S2:Payday
[99] T99|P1|REV|S3:Payday
[100] T100|Player 3 gains $1 from Salvage.
[100] T100|P3|ACT:Payday
[100] T100|PAYDAY|SALARIES:[2,2,3,1,1,2]
[101] T101|Player 3 gains $1 from Salvage.
[101] T101|P4|ACT:Payday
[101] T101|PAYDAY|SALARIES:[2,2,3,1,1,2]
[102] T102|P5|BUY:Residence Address in Destination|FROM:P5|COST:3
[103] T103|P0|STEAL:Ticket|SKIP_NEXT
[103] T103|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[104] T104|Player 3 gains $1 from Salvage.
[104] T104|P1|ACT:Payday
[104] T104|PAYDAY|SALARIES:[2,2,3,1,1,2]
[105] T105|P2|PAY_FEE:4|TO:P4
[105] T105|P2|DISC:Learn Song from Your Destination|FROM:P4|GAIN:2
[105] T105|P2|BLACKLISTED|LOSS:1
[106] T106|P3|PAY_FEE:4|TO:P2
[106] T106|P3|DISC:Enter Luxury Travel Club|FROM:P2|GAIN:2
[106] T106|Player 3 gains $1 from Salvage.
[107] T107|P4|PAY_FEE:2|TO:P5
[107] T107|P4|DISC:Background Check|FROM:P5|GAIN:2
[107] T107|Player 3 gains $1 from Salvage.
[107] T107|P5|REV|S1:Physical Exam
[107] T107|P5|REV|S2:Payday
[108] T108|Player 3 gains $1 from Salvage.
[108] T108|P5|ACT:Payday
[108] T108|PAYDAY|SALARIES:[2,2,3,1,1,2]
[109] T109|P0|SKIP_TURN
[110] T110|Player 3 gains $1 from Salvage.
[110] T110|P1|ACT:Payday
[110] T110|PAYDAY|SALARIES:[2,2,3,1,1,2]
[111] T111|P2|PAY_FEE:5|TO:P5
[111] T111|P2|DISC:Physical Exam|FROM:P5|GAIN:2
[111] T111|P2|BLACKLISTED|LOSS:1
[112] T112|P3|PAY_FEE:5|TO:P0
[112] T112|Player 3 gains $1 from Salvage.
[112] T112|P3|ACT:Trousers Fall Down
[112] T112|P3|ACT:Trousers Fall Down|LOSS:3
[113] T113|ROLL_D6:1
[113] T113|P4|COLLEGE_APP|ROLL:1|TUITION:3|RES:PASS
[114] T114|ROLL_D6:3
[114] T114|P5|COLLEGE_APP|ROLL:3|TUITION:4|RES:PASS
[115] T115|Player 3 gains $1 from Salvage.
[115] T115|P0|ACT:Payday
[115] T115|PAYDAY|SALARIES:[2,2,3,1,0,0]
[115] PHASE2_START
[115] PHASE2|P0|TRADE|$40:+12A|PEN_D:-3A|TOTAL_A:13
[115] T115|Player 3 gains $1 from Salvage.
[115] T115|Player 3 gains $1 from Salvage.
[115] T115|Player 3 gains $1 from Salvage.
[115] PHASE2|P1|TRADE|$30:+10A|3C:+6A|PEN_D:-2A|TOTAL_A:17
[115] PHASE2|P2|TRADE|$56:+14A|PEN_D:-3A|TOTAL_A:14
[115] PHASE2|P3|TRADE|$7:+2A|TOTAL_A:3
[115] PHASE2|P4|TRADE|$14:+4A|PEN_D:-2A|TOTAL_A:5
[115] PHASE2|P5|TRADE|$28:+8A|TOTAL_A:11
[115] PHASE2|P1|SELECT_LANE:Lane 1|TKN:7
[115] PHASE2|P1|CROSS:PASS|PAID_A:7|REM_A:10
[115] PHASE2|P2|SELECT_LANE:Lane 1|TKN:6
[115] PHASE2|P2|CROSS:PASS|PAID_A:6|REM_A:8
[115] PHASE2|P3|SELECT_LANE:Lane 5|TKN:9
[115] PHASE2|P3|CROSS:FAIL_LOW_A
[115] PHASE2|P4|SELECT_LANE:Lane 5|TKN:11
[115] PHASE2|P4|CROSS:FAIL_LOW_A
[115] PHASE2|P5|SELECT_LANE:Lane 5|TKN:3
[115] PHASE2|P5|CROSS:PASS|PAID_A:3|REM_A:8
[115] PHASE2|P0|SELECT_LANE:Lane 1|TKN:7
[115] PHASE2|P0|CROSS:PASS|PAID_A:7|REM_A:6
[115] GAME_OVER|WINNER: Player 2 (Assurance: 10, Money: $1)

[1] INIT|P0|NAT:Bosnian|DEST:China|$2|FACEUP:[4:Language Phrasebook,5:Payday,6:Fancy Clothes,11:Payday,12:Pet Passport,13:Dinner with a Diplomat]
[1] INIT|P1|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Keep Calm,5:Nostalgia,6:Payday,11:Friend moves to your Destination,12:Excellent Teamwork,13:Certificate of Excellence]
[1] INIT|P2|NAT:Congolese|DEST:France|$2|FACEUP:[4:Video Chat with Person from Destination,5:Endorsement from Royalty,6:Insider,11:Payday,12:Identical Twin,13:Trousers Fall Down]
[1] INIT|P3|NAT:French|DEST:Russia|$5|FACEUP:[4:Learn Song from Your Destination,5:Listen to the News,6:Payday,11:Camping,12:Letter of Invitation,13:Travel Concierge]
[1] INIT|P4|NAT:Russian|DEST:Senegal|$5|FACEUP:[4:Payday,5:Blacklisted,6:Payday,11:Payday,12:Learn from an Elder,13:Checklist]
[1] INIT|P5|NAT:Senegalese|DEST:Switzerland|$3|FACEUP:[4:Letter of Recommendation,5:Share,6:Pandemic / Economic Stimulus,11:Payday,12:Cookies for Neighbor from Destination,13:Become World Famous]
[1] T1|P0|ACT:Payday
[1] T1|PAYDAY|SALARIES:[1,1,1,1,1,1]
[1] T1|P0|REV|S7:Payday
[2] T2|P1|BUY:Friend moves to your Destination|FROM:P1|COST:2
[2] T2|P1|REV|S7:Shredder Accident
[3] T3|P2|PAY_FEE:1|TO:P1
[3] T3|P2|BUY:Certificate of Excellence|FROM:P1|COST:2
[3] T3|P1|REV|S10:Personality Test
[4] T4|P3|PAY_FEE:1|TO:P4
[4] T4|P3|BUY:Checklist|FROM:P4|COST:2
[4] T4|P4|REV|S10:Payday
[5] T5|P4|PAY_FEE:1|TO:P5
[5] T5|P4|BUY:Cookies for Neighbor from Destination|FROM:P5|COST:2
[6] T6|P5|BUY:Become World Famous|FROM:P5|COST:3
[6] T6|P5|REV|S9:Vehicle Registration Papers
[6] T6|P5|REV|S10:Network Fair
[7] T7|P0|BUY:Dinner with a Diplomat|FROM:P0|COST:3
[7] T7|P0|REV|S10:Politician Approves You
[8] T8|P1|BUY:Personality Test|FROM:P1|COST:3
[9] T9|P2|STEAL:Passport|SKIP_NEXT
[10] T10|P3|SELL:Checklist|GAIN:2
[10] T10|P3|BUY:Letter of Invitation|FROM:P3|COST:4
[11] T11|P4|SELL:Cookies for Neighbor from Destination|GAIN:2
[11] T11|P4|BUY:Learn from an Elder|FROM:P4|COST:3
[11] T11|P4|REV|S9:Salvage
[12] T12|P5|SELL:Become World Famous|GAIN:2
[12] T12|P5|BUY:Network Fair|FROM:P5|COST:3
[13] T13|P0|STEAL:Ticket|SKIP_NEXT
[14] T14|P1|SELL:Friend moves to your Destination|GAIN:2
[14] T14|P1|BUY:Excellent Teamwork|FROM:P1|COST:3
[14] T14|P1|REV|S8:Life Coach
[14] T14|P1|REV|S9:Payday
[15] T15|P2|SKIP_TURN
[16] T16|P3|STEAL:Passport|SKIP_NEXT
[17] T17|P4|STEAL:Ticket|SKIP_NEXT
[18] T18|P5|STEAL:Ticket|SKIP_NEXT
[19] T19|P0|SKIP_TURN
[20] T20|P1|STEAL:Passport|SKIP_NEXT
[21] T21|P2|ACT:Payday
[21] T21|PAYDAY|SALARIES:[1,1,1,1,1,1]
[21] T21|P2|REV|S7:Travel Brochure
[22] T22|P3|SKIP_TURN
[23] T23|P4|SKIP_TURN
[24] T24|P5|SKIP_TURN
[25] T25|P0|SELL:Dinner with a Diplomat|GAIN:2
[25] T25|P0|PAY_FEE:1|TO:P2
[25] T25|P0|BUY:Travel Brochure|FROM:P2|COST:2
[26] T26|P1|SKIP_TURN
[27] T27|ROLL_D6:1
[27] T27|P2|COLLEGE_APP|ROLL:1|TUITION:2|RES:PASS
[28] T28|P3|PAY_FEE:2|TO:P0
[28] T28|P3|DISC:Politician Approves You|FROM:P0|GAIN:2
[29] T29|ROLL_D6:5
[29] T29|P4|COLLEGE_APP|ROLL:5|TUITION:10|RES:FAIL
[29] T29|P4|PAY_FEE:2|TO:P5
[29] T29|P4|DISC:Vehicle Registration Papers|FROM:P5|GAIN:2
[30] T30|P5|SELL:Network Fair|GAIN:2
[30] T30|P5|PAY_FEE:1|TO:P0
[30] T30|P5|BUY:Pet Passport|FROM:P0|COST:4
[30] T30|P0|REV|S8:Language Classes
[30] T30|P0|REV|S9:VIP
[31] T31|P0|STEAL:Passport|SKIP_NEXT
[31] T31|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[32] T32|P1|SELL:Excellent Teamwork|GAIN:2
[32] T32|P1|PAY_FEE:1|TO:P0
[32] T32|P1|BUY:Language Classes|FROM:P0|COST:3
[33] T33|ROLL_D6:4
[33] T33|P2|GRAD|ROLL:4|RES:FAIL
[33] T33|ROLL_D6:3
[33] T33|P2|GRAD|ROLL:3|RES:PASS|SALARY_INC:1
[33] T33|P2|ACT:Identical Twin
[33] T33|P2|ACT:Identical Twin|GAIN:1|EXTRA_TURN
[33] T33|P2|REV|S8:Notebook
[33] T33|P2|ACT:Trousers Fall Down
[33] T33|P2|ACT:Trousers Fall Down|LOSS:3
[33] T33|P2|REV|S9:Payday
[33] T33|P2|REV|S10:FOMO
[34] T34|P3|ACT:Camping
[34] T34|P3|ACT:Camping|DELTA:[1,0,1,2,0,1]
[34] T34|P3|REV|S7:Payday
[34] T34|P3|REV|S8:Enter Luxury Travel Club
[35] T35|P4|SELL:Learn from an Elder|GAIN:2
[35] T35|P4|PAY_FEE:3|TO:P2
[35] T35|P4|BUY:Notebook|FROM:P2|COST:2
[36] T36|P5|STEAL:Passport|SKIP_NEXT
[36] T36|P5|TICKET_PASSPORT_BONUS|GAIN:1A
[37] T37|P0|SKIP_TURN
[38] T38|P1|STEAL:Ticket|SKIP_NEXT
[38] T38|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[39] T39|P2|BUY:Video Chat with Person from Destination|FROM:P2|COST:2
[39] T39|P2|REV|S0:Pay Cut
[40] T40|P3|BUY:Travel Concierge|FROM:P3|COST:4
[40] T40|P3|REV|S9:Payday
[40] T40|P3|REV|S10:Employment Contract
[41] T41|P4|STEAL:Passport|SKIP_NEXT
[41] T41|P4|TICKET_PASSPORT_BONUS|GAIN:1A
[42] T42|P5|SKIP_TURN
[43] T43|P0|PAY_FEE:2|TO:P3
[43] T43|P0|DISC:Enter Luxury Travel Club|FROM:P3|GAIN:2
[44] T44|P1|SKIP_TURN
[45] T45|P2|ACT:Payday
[45] T45|PAYDAY|SALARIES:[1,1,2,1,1,1]
[46] T46|P3|STEAL:Ticket|SKIP_NEXT
[46] T46|P3|TICKET_PASSPORT_BONUS|GAIN:1A
[47] T47|P4|SKIP_TURN
[48] T48|P5|PAY_FEE:2|TO:P3
[48] T48|P5|DISC:Employment Contract|FROM:P3|GAIN:2
[49] T49|P0|ACT:VIP
[49] T49|P0|ACT:VIP|GAIN:3
[50] T50|P1|ACT:Shredder Accident
[50] T50|P1|ACT:Shredder Accident|DISC:Personality Test
[51] T51|P2|SELL:Video Chat with Person from Destination|GAIN:2
[51] T51|P2|BUY:Endorsement from Royalty|FROM:P2|COST:3
[51] T51|P2|REV|S1:Payday
[52] T52|P3|SKIP_TURN
[53] T53|P4|ACT:Salvage
[53] T53|P4|ACT:Salvage|GAIN:1|KEEP
[54] T54|Player 5 gains $1 from Salvage.
[54] T54|P5|ACT:Pandemic / Economic Stimulus
[54] T54|ROLL_D6:3
[54] T54|P5|ACT:PANDEMIC_STIMULUS|DELTA:[-3,-2,-3,-3,-3,-3]
[54] T54|P5|REV|S3:Lost & Found
[55] T55|Player 5 gains $1 from Salvage.
[55] T55|P0|ACT:Fancy Clothes
[55] T55|P0|KEEP:Fancy Clothes
[55] T55|P0|REV|S3:Reward
[56] T56|Player 5 gains $1 from Salvage.
[56] T56|P1|ACT:Life Coach
[56] T56|P1|ACT:Life Coach|GAIN_A:1
[57] T57|Player 5 gains $1 from Salvage.
[57] T57|P2|ACT:Payday
[57] T57|PAYDAY|SALARIES:[1,1,2,1,1,1]
[58] T58|Player 5 gains $1 from Salvage.
[58] T58|P3|ACT:Payday
[58] T58|PAYDAY|SALARIES:[1,1,2,1,1,1]
[59] T59|P4|ACT:Payday
[59] T59|PAYDAY|SALARIES:[1,1,2,1,1,1]
[59] T59|P4|REV|S7:Philanthropy
[59] T59|P4|REV|S8:Coffee with Airport Employee
[60] T60|Player 5 gains $1 from Salvage.
[60] T60|P5|ACT:Lost & Found
[60] T60|P5|ACT:Lost & Found|TAKE:MONEY:2|FROM:P0
[61] T61|Player 5 gains $1 from Salvage.
[61] T61|P0|ACT:Reward
[61] T61|P0|ACT:Reward|DELTA:[6,-1,-1,-1,-1,-1]
[62] T62|Player 5 gains $1 from Salvage.
[62] T62|P1|ACT:Keep Calm
[62] T62|P1|ACT:Keep Calm|GAIN:1|KEEP
[62] T62|P1|REV|S0:Physical Exam
[63] T63|P2|SELL:Endorsement from Royalty|GAIN:2
[63] T63|Player 5 gains $1 from Salvage.
[63] T63|P2|PAY_FEE:2|TO:P4
[63] T63|P2|BUY:Coffee with Airport Employee|FROM:P4|COST:2
[64] T64|Player 5 gains $1 from Salvage.
[64] T64|P3|ACT:Payday
[64] T64|PAYDAY|SALARIES:[1,1,2,1,1,1]
[64] T64|P3|REV|S3:Social Butterfly
[65] T65|P4|ACT:Philanthropy
[65] T65|P4|ACT:Philanthropy|DELTA:[1,1,1,1,-6,1]
[66] T66|Player 5 gains $1 from Salvage.
[66] T66|P5|ACT:Payday
[66] T66|PAYDAY|SALARIES:[1,1,2,1,1,1]
[66] T66|P5|REV|S7:Attend Security Training
[66] T66|P5|REV|S8:Attend History Class
[67] T67|Player 5 gains $1 from Salvage.
[67] T67|P0|ACT:Payday
[67] T67|PAYDAY|SALARIES:[1,1,2,1,1,1]
[67] T67|P0|REV|S2:Background Check
[68] T68|P1|PAY_FEE:2|TO:P0
[68] T68|P1|DISC:Background Check|FROM:P0|GAIN:2
[68] T68|Player 5 gains $1 from Salvage.
[69] T69|P2|SELL:Coffee with Airport Employee|GAIN:2
[69] T69|Player 5 gains $1 from Salvage.
[69] T69|P2|PAY_FEE:3|TO:P3
[69] T69|P2|BUY:Listen to the News|FROM:P3|COST:2
[69] T69|P3|REV|S2:Payday
[70] T70|Player 5 gains $1 from Salvage.
[70] T70|P3|ACT:Social Butterfly
[70] T70|P3|ACT:Social Butterfly|TAKE:MONEY:3|FROM:P0
[71] T71|P4|ACT:Blacklisted
[71] T71|P4|ACT:Blacklisted|LOSS:1|KEEP
[72] T72|P5|BUY:Attend Security Training|FROM:P5|COST:3
[73] T73|Player 5 gains $1 from Salvage.
[73] T73|P0|ACT:Payday
[73] T73|PAYDAY|SALARIES:[1,1,2,1,1,1]
[74] T74|Player 5 gains $1 from Salvage.
[74] T74|P1|ACT:Payday
[74] T74|PAYDAY|SALARIES:[1,1,2,1,1,1]
[75] T75|P2|STEAL:Ticket|SKIP_NEXT
[75] T75|P2|TICKET_PASSPORT_BONUS|GAIN:1A
[76] T76|Player 5 gains $1 from Salvage.
[76] T76|P3|ACT:Payday
[76] T76|PAYDAY|SALARIES:[1,1,2,1,1,1]
[77] T77|P4|BLACKLISTED|LOSS:1
[77] T77|P4|ACT:Payday
[77] T77|PAYDAY|SALARIES:[1,1,2,1,1,1]
[78] T78|P5|PAY_FEE:3|TO:P3
[78] T78|P5|DISC:Learn Song from Your Destination|FROM:P3|GAIN:2
[78] T78|Player 5 gains $1 from Salvage.
[78] T78|P3|REV|S0:Payday
[78] T78|P3|REV|S1:Payday
[79] T79|P0|BUY:Language Phrasebook|FROM:P0|COST:3
[79] T79|P0|REV|S0:Vaccination Record
[79] T79|P0|REV|S1:Payday
[80] T80|Player 5 gains $1 from Salvage.
[80] T80|P1|ACT:Nostalgia
[80] T80|P1|ACT:Nostalgia|GAIN:2
[80] T80|P1|REV|S1:Payday
[81] T81|P2|SKIP_TURN
[82] T82|Player 5 gains $1 from Salvage.
[82] T82|P3|ACT:Payday
[82] T82|PAYDAY|SALARIES:[1,1,2,1,1,1]
[83] T83|P4|BLACKLISTED|LOSS:1
[83] T83|P4|ACT:Payday
[83] T83|PAYDAY|SALARIES:[1,1,2,1,1,1]
[83] T83|P4|REV|S2:Pandemic / Economic Stimulus
[83] T83|P4|REV|S3:Mental Fog
[84] T84|P5|PAY_FEE:4|TO:P0
[84] T84|P5|DISC:Vaccination Record|FROM:P0|GAIN:2
[84] T84|Player 5 gains $1 from Salvage.
[85] T85|Player 5 gains $1 from Salvage.
[85] T85|P0|ACT:Payday
[85] T85|PAYDAY|SALARIES:[1,1,2,1,1,1]
[86] T86|Player 5 gains $1 from Salvage.
[86] T86|P1|ACT:Payday
[86] T86|PAYDAY|SALARIES:[1,1,2,1,1,1]
[87] T87|Player 5 gains $1 from Salvage.
[87] T87|P2|ACT:FOMO
[87] T87|P2|ACT:FOMO|LOSS:1
[88] T88|Player 5 gains $1 from Salvage.
[88] T88|P3|ACT:Payday
[88] T88|PAYDAY|SALARIES:[1,1,2,1,1,1]
[89] T89|P4|BLACKLISTED|LOSS:1
[89] T89|P4|ACT:Pandemic / Economic Stimulus
[89] T89|ROLL_D6:2
[89] T89|P4|ACT:PANDEMIC_STIMULUS|DELTA:[2,2,2,2,2,2]
[90] T90|P5|PAY_FEE:5|TO:P1
[90] T90|P5|DISC:Physical Exam|FROM:P1|GAIN:2
[90] T90|Player 5 gains $1 from Salvage.
[91] T91|P0|PAY_FEE:3|TO:P5
[91] T91|P0|DISC:Attend History Class|FROM:P5|GAIN:2
[91] T91|Player 5 gains $1 from Salvage.
[92] T92|Player 5 gains $1 from Salvage.
[92] T92|P1|ACT:Payday
[92] T92|PAYDAY|SALARIES:[1,1,2,1,1,1]
[92] T92|P1|REV|S2:Copy of Birth Certificate
[92] T92|P1|REV|S3:Support Group Motivates You
[93] T93|Player 5 gains $1 from Salvage.
[93] T93|P2|ACT:Insider
[93] T93|P2|KEEP:Insider
[93] T93|P2|REV|S2:Write Last Will and Testament
[93] T93|P2|REV|S3:Payday
[94] T94|Player 5 gains $1 from Salvage.
[94] T94|P3|ACT:Payday
[94] T94|PAYDAY|SALARIES:[1,1,3,1,1,1]
[95] T95|P4|BLACKLISTED|LOSS:1
[95] T95|P4|ACT:Mental Fog
[95] T95|P4|ACT:Mental Fog|LOSS:1
[96] T96|Player 5 gains $1 from Salvage.
[96] T96|P5|ACT:Share
[96] T96|P5|ACT:Share|DELTA:[2,2,1,1,1,-7]
[96] T96|P5|REV|S2:Internship in Your Destination
[97] T97|P0|PAY_FEE:4|TO:P1
[97] T97|P0|DISC:Copy of Birth Certificate|FROM:P1|GAIN:2
[97] T97|Player 5 gains $1 from Salvage.
[98] T98|P1|BUY:Support Group Motivates You|FROM:P1|COST:2
[99] T99|P2|BUY:Write Last Will and Testament|FROM:P2|COST:2
[100] T100|P3|PAY_FEE:3|TO:P5
[100] T100|P3|DISC:Internship in Your Destination|FROM:P5|GAIN:2
[100] T100|Player 5 gains $1 from Salvage.
[101] T101|P4|BLACKLISTED|LOSS:1
[101] T101|P4|ACT:Payday
[101] T101|PAYDAY|SALARIES:[1,1,3,1,1,1]
[101] T101|P4|REV|S0:Bailout
[101] T101|P4|REV|S1:Payday
[102] T102|P5|DISC:Letter of Recommendation|FROM:P5|GAIN:2
[102] T102|Player 5 gains $1 from Salvage.
[102] T102|P5|REV|S0:Residence Address in Destination
[102] T102|P5|REV|S1:Suspect
[103] T103|P0|PAY_FEE:5|TO:P5
[103] T103|P0|DISC:Residence Address in Destination|FROM:P5|GAIN:2
[103] T103|Player 5 gains $1 from Salvage.
[104] T104|P1|PAY_FEE:3|TO:P2
[104] T104|Player 5 gains $1 from Salvage.
[104] T104|P1|ACT:Pay Cut
[104] T104|P1|ACT:Pay Cut|LOSS:1|KEEP
[105] T105|Player 5 gains $1 from Salvage.
[105] T105|P2|ACT:Payday
[105] T105|PAYDAY|SALARIES:[1,0,3,1,1,1]
[106] T106|P3|PAY_FEE:4|TO:P4
[106] T106|Player 5 gains $1 from Salvage.
[106] T106|P3|ACT:Bailout
[106] T106|P3|ACT:Bailout|DELTA:[0,0,0,1,0,1]
[107] T107|P4|BLACKLISTED|LOSS:1
[107] T107|P4|ACT:Payday
[107] T107|PAYDAY|SALARIES:[1,0,3,1,1,1]
[108] T108|Player 5 gains $1 from Salvage.
[108] T108|P5|ACT:Suspect
[108] T108|P5|ACT:Suspect|LOSS:1
[108] T108|P5|ACT:Suspect|DISC:Pet Passport
[108] T108|Player 5 gains $1 from Salvage.
[108] PHASE2_START
[108] PHASE2|P0|TRADE|$20:+6A|TOTAL_A:7
[108] PHASE2|P1|TRADE|$24:+8A|PEN_D:-2A|TOTAL_A:8
[108] PHASE2|P2|TRADE|$40:+10A|TOTAL_A:13
[108] PHASE2|P3|TRADE|$28:+8A|PEN_D:-3A|TOTAL_A:6
[108] PHASE2|P4|TRADE|$49:+14A|PEN_D:-2A|TOTAL_A:13
[108] PHASE2|P5|TRADE|$21:+6A|PEN_D:-3A|TOTAL_A:4
[108] PHASE2|P0|SELECT_LANE:Lane 1|TKN:7
[108] PHASE2|P0|CROSS:PASS|PAID_A:7|REM_A:0
[108] PHASE2|P1|SELECT_LANE:Lane 1|TKN:7
[108] PHASE2|P1|CROSS:PASS|PAID_A:7|REM_A:1
[108] PHASE2|P2|SELECT_LANE:Lane 1|TKN:6
[108] PHASE2|P2|CROSS:PASS|PAID_A:6|REM_A:7
[108] PHASE2|P3|SELECT_LANE:Lane 2|TKN:8
[108] PHASE2|P3|CROSS:FAIL_LOW_A
[108] PHASE2|P4|SELECT_LANE:Lane 2|TKN:6
[108] PHASE2|P4|CROSS:PASS|PAID_A:6|REM_A:7
[108] PHASE2|P5|SELECT_LANE:Lane 4|TKN:8
[108] PHASE2|P5|CROSS:FAIL_LOW_A
[108] GAME_OVER|WINNER: Player 5 (Assurance: 7, Money: $5)

[1] INIT|P0|NAT:Bosnian|DEST:China|$2|FACEUP:[4:Payday,5:Payday,6:Payday,11:Island Paradise,12:Pandemic / Economic Stimulus,13:Letter of Invitation]
[1] INIT|P1|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Attend Security Training,5:Language Phrasebook,6:Cookies for Neighbor from Destination,11:Payday,12:Payday,13:Rummage Sale]
[1] T1|ROLL_D6:6
[1] T1|P0|COLLEGE_APP|ROLL:6|TUITION:8|RES:FAIL
[1] T1|P0|ACT:Pandemic / Economic Stimulus
[1] T1|ROLL_D6:6
[1] T1|P0|ACT:PANDEMIC_STIMULUS|DELTA:[-1,-6]
[2] T2|P1|ACT:Rummage Sale
[2] T2|P1|ACT:Rummage Sale|GAIN:3|NO_DOCS
[2] T2|P1|REV|S10:Payday
[3] T3|P0|ACT:Island Paradise
[3] T3|P0|ACT:Island Paradise|DELTA:[2,1]
[3] T3|P0|REV|S7:Background Check
[3] T3|P0|REV|S8:Mental Fog
[4] T4|P1|PAY_FEE:1|TO:P0
[4] T4|P1|DISC:Letter of Invitation|FROM:P0|GAIN:2
[4] T4|P0|REV|S9:Notebook
[4] T4|P0|REV|S10:Friend moves to your Destination
[5] T5|P0|BUY:Notebook|FROM:P0|COST:2
[6] T6|P1|PAY_FEE:2|TO:P0
[6] T6|P1|BUY:Friend moves to your Destination|FROM:P0|COST:2
[7] T7|P0|STEAL:Passport|SKIP_NEXT
[8] T8|P1|STEAL:Ticket|SKIP_NEXT
[9] T9|P0|SKIP_TURN
[10] T10|P1|SKIP_TURN
[11] T11|P0|ACT:Payday
[11] T11|PAYDAY|SALARIES:[1,1]
[11] T11|P0|REV|S3:Insider
[12] T12|P1|ACT:Payday
[12] T12|PAYDAY|SALARIES:[1,1]
[12] T12|P1|REV|S9:Support Group Motivates You
[13] T13|P0|SELL:Notebook|GAIN:2
[13] T13|P0|PAY_FEE:1|TO:P1
[13] T13|P0|BUY:Support Group Motivates You|FROM:P1|COST:2
[14] T14|P1|ACT:Payday
[14] T14|PAYDAY|SALARIES:[1,1]
[15] T15|P0|STEAL:Ticket|SKIP_NEXT
[15] T15|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[16] T16|P1|BUY:Cookies for Neighbor from Destination|FROM:P1|COST:2
[16] T16|P1|REV|S3:Swap Wallets
[17] T17|P0|SKIP_TURN
[18] T18|P1|ACT:Swap Wallets
[18] T18|P1|ACT:Swap Wallets|SWAP:P0
[19] T19|P0|ACT:Insider
[19] T19|P0|KEEP:Insider
[20] T20|P1|ACT:Payday
[20] T20|PAYDAY|SALARIES:[2,1]
[20] T20|P1|REV|S7:Learn from an Elder
[20] T20|P1|REV|S8:Payday
[21] T21|P0|ACT:Mental Fog
[21] T21|P0|ACT:Mental Fog|LOSS:1
[22] T22|P1|BUY:Learn from an Elder|FROM:P1|COST:3
[23] T23|P0|ACT:Payday
[23] T23|PAYDAY|SALARIES:[2,1]
[23] T23|P0|REV|S2:Pandemic / Economic Stimulus
[24] T24|P1|ACT:Payday
[24] T24|PAYDAY|SALARIES:[2,1]
[25] T25|P0|PAY_FEE:2|TO:P1
[25] T25|P0|DISC:Attend Security Training|FROM:P1|GAIN:2
[25] T25|P1|REV|S0:Network Fair
[26] T26|P1|BUY:Language Phrasebook|FROM:P1|COST:4
[26] T26|P1|REV|S1:Stellar Reputation
[26] T26|P1|REV|S2:Payday
[27] T27|P0|ACT:Pandemic / Economic Stimulus
[27] T27|ROLL_D6:4
[27] T27|P0|ACT:PANDEMIC_STIMULUS|DELTA:[4,4]
[28] T28|P1|STEAL:Passport|SKIP_NEXT
[28] T28|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[29] T29|P0|PAY_FEE:3|TO:P1
[29] T29|P0|DISC:Network Fair|FROM:P1|GAIN:2
[30] T30|P1|SKIP_TURN
[31] T31|P0|DISC:Background Check|FROM:P0|GAIN:2
[32] T32|P1|ACT:Stellar Reputation
[32] T32|P1|KEEP:Stellar Reputation
[33] T33|P0|ACT:Payday
[33] T33|PAYDAY|SALARIES:[2,1]
[33] T33|P0|REV|S0:Write Last Will and Testament
[33] T33|P0|REV|S1:Physical Exam
[34] T34|P1|ACT:Payday
[34] T34|PAYDAY|SALARIES:[2,1]
[35] T35|P0|BUY:Write Last Will and Testament|FROM:P0|COST:2
[36] T36|P1|PAY_FEE:3|TO:P0
[36] T36|P1|DISC:Physical Exam|FROM:P0|GAIN:2
[36] PHASE2_START
[36] PHASE2|P0|TRADE|$10:+3A|PEN_D:-3A|TOTAL_A:1
[36] PHASE2|P1|TRADE|$6:+2A|3C:+6A|PEN_D:-2A|TOTAL_A:7
[36] PHASE2|P0|SELECT_LANE:Lane 1|TKN:7
[36] PHASE2|P0|CROSS:FAIL_LOW_A
[36] PHASE2|P1|SELECT_LANE:Lane 1|TKN:6
[36] PHASE2|P1|CROSS:PASS|PAID_A:6|REM_A:1
[36] GAME_OVER|WINNER: Player 2 (Assurance: 1, Money: $5)

[1] INIT|P0|NAT:Bosnian|DEST:China|$2|FACEUP:[4:Payday,5:Favorable Cultural Opinion,6:Pandemic / Economic Stimulus,11:Mental Fog,12:Payday,13:Payday]
[1] INIT|P1|NAT:Chinese|DEST:Democratic Republic of Congo|$6|FACEUP:[4:Network Fair,5:Subscribe to Travel Updates,6:Island Paradise,11:Residence Address in Destination,12:Attend History Class,13:Checklist]
[1] T1|P0|ACT:Payday
[1] T1|PAYDAY|SALARIES:[1,1]
[2] T2|P1|BUY:Checklist|FROM:P1|COST:2
[2] T2|P1|REV|S10:Payday
[3] T3|P0|ACT:Payday
[3] T3|PAYDAY|SALARIES:[1,1]
[3] T3|P0|REV|S9:Politician Approves You
[3] T3|P0|REV|S10:Copy of Birth Certificate
[4] T4|P1|BUY:Attend History Class|FROM:P1|COST:4
[4] T4|P1|REV|S9:Insider
[5] T5|P0|BUY:Copy of Birth Certificate|FROM:P0|COST:2
[6] T6|P1|STEAL:Ticket|SKIP_NEXT
[7] T7|P0|STEAL:Passport|SKIP_NEXT
[8] T8|P1|SKIP_TURN
[9] T9|P0|SKIP_TURN
[10] T10|P1|STEAL:Passport|SKIP_NEXT
[10] T10|P1|TICKET_PASSPORT_BONUS|GAIN:1A
[11] T11|P0|PAY_FEE:1|TO:P1
[11] T11|P0|DISC:Residence Address in Destination|FROM:P1|GAIN:2
[11] T11|P1|REV|S7:Travel Brochure
[11] T11|P1|REV|S8:Physical Exam
[12] T12|P1|SKIP_TURN
[13] T13|P0|PAY_FEE:2|TO:P1
[13] T13|P0|DISC:Physical Exam|FROM:P1|GAIN:2
[14] T14|P1|PAY_FEE:1|TO:P0
[14] T14|P1|DISC:Politician Approves You|FROM:P0|GAIN:2
[15] T15|P0|ACT:Pandemic / Economic Stimulus
[15] T15|ROLL_D6:6
[15] T15|P0|ACT:PANDEMIC_STIMULUS|DELTA:[-4,-6]
[15] T15|P0|REV|S3:Payday
[16] T16|P1|ACT:Insider
[16] T16|P1|KEEP:Insider
[17] T17|P0|ACT:Payday
[17] T17|PAYDAY|SALARIES:[1,2]
[18] T18|P1|ACT:Payday
[18] T18|PAYDAY|SALARIES:[1,2]
[19] T19|P0|ACT:Mental Fog
[19] T19|P0|ACT:Mental Fog|LOSS:1
[19] T19|P0|REV|S7:Payday
[19] T19|P0|REV|S8:Friend moves to your Destination
[20] T20|P1|PAY_FEE:2|TO:P0
[20] T20|P1|DISC:Friend moves to your Destination|FROM:P0|GAIN:2
[21] T21|P0|ACT:Payday
[21] T21|PAYDAY|SALARIES:[1,2]
[22] T22|P1|ACT:Island Paradise
[22] T22|P1|ACT:Island Paradise|DELTA:[1,2]
[22] T22|P1|REV|S3:Certificate of Excellence
[23] T23|P0|BUY:Favorable Cultural Opinion|FROM:P0|COST:4
[23] T23|P0|REV|S2:Endorsement from Royalty
[24] T24|P1|BUY:Certificate of Excellence|FROM:P1|COST:2
[25] T25|P0|STEAL:Ticket|SKIP_NEXT
[25] T25|P0|TICKET_PASSPORT_BONUS|GAIN:1A
[26] T26|P1|PAY_FEE:3|TO:P0
[26] T26|P1|DISC:Endorsement from Royalty|FROM:P0|GAIN:2
[27] T27|P0|SKIP_TURN
[28] T28|P1|DISC:Subscribe to Travel Updates|FROM:P1|GAIN:2
[28] T28|P1|REV|S2:Payday
[29] T29|P0|ACT:Payday
[29] T29|PAYDAY|SALARIES:[1,2]
[29] T29|P0|REV|S0:Swap Wallets
[29] T29|P0|REV|S1:Stellar Reputation
[30] T30|P1|ACT:Payday
[30] T30|PAYDAY|SALARIES:[1,2]
[31] T31|P0|ACT:Swap Wallets
[31] T31|P0|ACT:Swap Wallets|SWAP:P1
[32] T32|P1|DISC:Travel Brochure|FROM:P1|GAIN:2
[33] T33|P0|ACT:Stellar Reputation
[33] T33|P0|KEEP:Stellar Reputation
[34] T34|P1|BUY:Network Fair|FROM:P1|COST:3
[34] T34|P1|REV|S0:Pandemic / Economic Stimulus
[34] T34|P1|REV|S1:Rummage Sale
[35] T35|P0|PAY_FEE:3|TO:P1
[35] T35|P0|ACT:Rummage Sale
[35] T35|P0|ACT:Rummage Sale|GAIN:3
[36] T36|P1|ACT:Pandemic / Economic Stimulus
[36] T36|ROLL_D6:2
[36] T36|P1|ACT:PANDEMIC_STIMULUS|DELTA:[2,2]
[36] PHASE2_START
[36] PHASE2|P0|TRADE|$10:+3A|PEN_D:-3A|TOTAL_A:1
[36] PHASE2|P1|TRADE|$6:+2A|TOTAL_A:3
[36] PHASE2|P0|SELECT_LANE:Lane 1|TKN:7
[36] PHASE2|P0|CROSS:FAIL_LOW_A
[36] PHASE2|P1|SELECT_LANE:Lane 5|TKN:11
[36] PHASE2|P1|CROSS:FAIL_LOW_A
[36] GAME_OVER|WINNER (no one crossed, most Money): Player 2 ($4)
